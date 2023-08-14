
let prereqs = [];
let antireqs = [];
let courseGroups = [];
let studentCodes = [];

function cleanObject(obj) {
    for (const key in obj) {
        if (obj[key] === '' || obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}

// returns true if all courses in the group is in the student courses
function groupSatisfied(groupId) {
    // checks for multiple courses in a group
    // console.log("courseGroups Length: ", courseGroups.length);
    for (let i = 0; i < courseGroups.length; i++) {
        if (courseGroups[i].groupId === groupId) {
            // console.log("prereq courseCode:", courseGroups[i].courseCode);
            // console.log("student courses",studentCodes);

            // if the student does not satisfy the course
            if (!studentCodes.includes(courseGroups[i].courseCode)) {


                // since the student must satisfy all the courses in th group return false
                return false;
            }
        }
    }
    // student satisfies all the courses in the group 
    return true;
}

// returns true if atleast one group of courses is in the student courses
function atLeastOneGroupSatisfied(groupIds) {
    for (const groupId of groupIds) {
        if (groupSatisfied(groupId)) {
            // console.log("group satisfied");
            return true;
        }
    }
    return false;
}

// checks if the prerequisites a course in a programme is satisfied  
function arePrerequisitesSatisfied(courseCode, programmeId) {

    let groupIds = [];

    for (j = 0; j < prereqs.length; j++) {
        // if course has prereq for programme
        if (prereqs[j].courseCode === courseCode && prereqs[j].programmeId === programmeId) {
            // console.log("prereq::::::> ", prereqs[j].courseCode);
            // get all groups of prerequisites 
            groupIds.push(prereqs[j].groupId);
            // console.log("courseCode", courseCode);
            // console.log("programmeId", programmeId);
            // console.log("\ngroupIds", groupIds);

        }
    }

    // if there are no groups return true OR if at least one group is satisfied return true
    return groupIds.length === 0 || atLeastOneGroupSatisfied(groupIds);

}

// checks if the student did any anti-requisites for the course
function completedAntirequisites(courseCode) {
    for (let i = 0; i < antireqs.length; i++) {
        if (antireqs[i].courseCode === courseCode) {
            for (let j = 0; j < studentCourseCodes.length; j++) {
                if (studentCourseCodes[j] === antireqs[i].antirequisiteCourseCode) {
                    // console.log("LOG::>" );
                    // console.log(" student course", studentCourseCodes[j]);
                    // console.log(" antirequisite course", antirequisites[i].antirequisiteCourseCode);
                    return true;
                }
            }
        }
    }
    return false;
}

// returns a list of courses the student can register for in the next semester
function getEligibleCourses(programmeId, studentCourseCodes, programmeCourses, semesterCourses, prerequisites, antirequisites, coursegroups) {
    let registerableCourses = [];
    prereqs = prerequisites;
    antireqs = antirequisites;
    courseGroups = coursegroups;
    studentCodes = studentCourseCodes;
    // console.log("student course codes:<><><>:::::: ", studentCodes);

    // if(degreeProgress.remainingCredits === 0){
    //     return registerableCourses;
    // } 

    // console.log("programmeId", programmeId);
    // console.log("studentCourseCodes: ", studentCourseCodes);
    // console.log("programmeCourses", programmeCourses);
    // console.log("semesterCourses", semesterCourses);
    // console.log("prereq", prerequisites);
    // console.log("courseGroup", courseGroups);
    // console.log("anit-req", antirequisites);

    // for each programme course
    for (i = 0; i < programmeCourses.length; i++) {

        let prereqSatisfied = false;
        let completedAntireq = false;
        // console.log("programmeCourses::> ",programmeCourses[i]);

        // if programmeCourse not completed by the student and is available in the semester
        if (!studentCourseCodes.includes(programmeCourses[i].courseCode) && semesterCourses.includes(programmeCourses[i].courseCode)) {

            // check if the student has satisfied the prereqs
            prereqSatisfied = arePrerequisitesSatisfied(programmeCourses[i].courseCode, programmeId);
            //     console.log("prereqSatisfied::> ",prereqSatisfied);
            // console.log("Course::> ",programmeCourses[i].courseCode);


            // check if the student has done any anti-requisites
            completedAntireq = completedAntirequisites(programmeCourses[i].courseCode);
            // console.log("completedAntireq::> ",completedAntireq);

            // registerableCourses.push(programmeCourses[i].courseCode);
        }

        // if student satisfies the prereqs and have not done any anti-reqs, course is registerable 
        if (prereqSatisfied === true && completedAntireq === false) {
            registerableCourses.push(programmeCourses[i].courseCode);
            // console.log("push course: ", programmeCourses[i]);
        }



    }

    return registerableCourses;
}



module.exports = { getEligibleCourses };

