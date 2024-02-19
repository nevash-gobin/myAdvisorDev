const router = require("express").Router();
const bcrypt = require("bcrypt");
const staffAccountVerification = require("../middleware/staffAccountVerification");
const { getEligibleCourses } = require("../controllers/getEligibleCourses");
const { getDegreeProgress } = require("../controllers/getDegreeProgress");
const { getPlannedCourses } = require("../controllers/getPlannedCourses");
const { getStudentYear } = require("../controllers/getStudentYear");
const { getCoursePlan } = require("../controllers/getCoursePlan");

// import models
const Admin = require("../models/Admin");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const Prerequisite = require("../models/Prerequisite");
const Group = require("../models/Group");
const CourseGroup = require("../models/CourseGroup");
const Antirequisite = require("../models/Antirequisite");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");
const Semester = require("../models/Semester");
const Type = require("../models/Type");
const ElectiveRequirement = require("../models/ElectiveRequirement");

const StudentCourse = require("../models/StudentCourse");
const Transcript = require("../models/Transcript");
const SemesterCourses = require("../models/semesterCourse");
// const CourseGroup = require("../models/CourseGroup");
const PCR = require("../models/ElectiveRequirement");
// const Type = require("../models/Type");

// ---Routes---

// Create Admin Account
router.post("/create/admin", staffAccountVerification, async (req, res) => {
    try {
        const { adminID, firstName, lastName, email, password } = req.body

        // check if staff exists since duplicate usernames aren't allowed
        const admin = await Admin.findOne({ where: { "adminID": adminID } });
        if (admin) {
            return res.status(401).send("Administrator Account Already Exists!");
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);

            await Admin.create({
                adminID,
                firstName,
                lastName,
                email,
                password: passEncrypt,
            })
                .then(() => {
                    return res.status(200).send("Administrator Account Created Successfully!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Create Student Account
router.post("/create/student", async (req, res) => {
    try {
        // destructure data entered
        const { studentID, firstName, lastName, email, programmeId, password } = req.body

        // check if student exists since duplicate usernames aren't allowed
        const student = await Student.findOne({ where: { "studentID": studentID } });
        if (student) {
            return res.status(401).send("Student Account Already Exist!");
        }
        else {
            const saltRounds = 10;      // saltRounds are needed to increase the degree of hashing
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);// passEncrypt is the encrypted version of the password entered which uses the salt created

            await Student.create({
                studentID,
                firstName,
                lastName,
                email,
                programmeId,
                password: passEncrypt,
            })
                .then(() => {
                    return res.status(200).send("Student Account Created Successfully!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Get All Advising Sessions
router.get("/student/advising-sessions", async (req, res) => {
    try {
        const sessions = await AdvisingSession.findAll();
        res.status(200).json(sessions);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get course plan for a student
router.get("/course-plan/:semesterId/:studentId", staffAccountVerification, async (req, res) => {

    let semesterId = req.params.semesterId;
    let studentId = req.params.studentId;
    // const studentId = req.user;
    let programme;
    // -----------------GET DATA FROM DATABASE-------------------------

    //#region 

    // get course codes of courses completed by student
    const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
    let studentCourseCodes = [];
    for (i = 0; i < studentCourses.length; i++) {
        studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
    }
    // console.log("student courses: ", studentCourseCodes);

    // Get programme id from student model
    const student = await Student.findOne({ where: { studentID: studentId } });
    if (student) {
        programmeId = student.dataValues.programmeId;
        // console.log("student: ", student.dataValues.programmeId);
    }

    //  get programme courses for programmeId
    const programmeCourse = await ProgrammeCourse.findAll({ where: { programmeId } });
    let programmeCourses = [];
    for (i = 0; i < programmeCourse.length; i++) {
        programmeCourses.push(programmeCourse[i].dataValues);
    }
    // console.log("programmeCourses: ", programmeCourses);


    // get semesterCourses
    const semesterCourses = await SemesterCourses.findAll({ where: { semesterId: semesterId } })
    let semCourses = [];
    for (i = 0; i < semesterCourses.length; i++) {
        semCourses.push(semesterCourses[i].dataValues.courseCode);
    }
    // console.log("Semester Courses :  ", semCourses);


    // get prerequisites
    const prerequisites = await Prerequisite.findAll();
    let prereqs = [];
    for (let prereq in prerequisites) {
        prereqs.push(prerequisites[prereq].dataValues);
        // console.log("prerequisites: ", prerequisites[prereq]. dataValues);
    }
    // console.log("prerequisites: ", prereqs);

    // get antirequisites
    const antirequisites = await Antirequisite.findAll();
    let antireqs = [];
    for (let antireq in antirequisites) {
        antireqs.push(antirequisites[antireq].dataValues);
    }
    // console.log("antireqs: ", antireqs);

    // get courseGroups
    const courseGroups = await CourseGroup.findAll();
    let coursegroups = [];
    for (let cg in courseGroups) {
        coursegroups.push(courseGroups[cg].dataValues);
        // console.log("prerequisites: ", prerequisites[prereq]. dataValues);
    }
    // console.log("courseGroups:  ", coursegroups);

    //  get courses
    let course = await Course.findAll();
    let courses = [];
    for (i = 0; i < course.length; i++) {
        courses.push(course[i].dataValues);
    }
    //  console.log("courses: ", courses);

    // get programmeCreditRequirements
    let pcrs = await PCR.findAll({ where: { programmeId } });
    let programmeCreditRequirements = [];
    for (i = 0; i < pcrs.length; i++) {
        programmeCreditRequirements.push(pcrs[i].dataValues);
    }
    // console.log("PCR: ", programmeCreditRequirements);

    // get types
    let type = await Type.findAll();
    let types = [];
    for (i = 0; i < type.length; i++) {
        types.push(type[i].dataValues);
    }
    // console.log("types: ", types);

    //#endregion


    // -----------------CALL THE FUNCTION-------------------------

    let coursePlan = await getCoursePlan(programmeId, studentCourseCodes, programmeCourses, semCourses, prereqs, antireqs, coursegroups, courses, programmeCreditRequirements, types, studentId, semesterId);




    // console.log("COURSEPLAN:::> ",coursePlan);
    res.json({
        "Course Plan: ": coursePlan
    });

});

// get course plan for all students
router.get("/course-plan/:semesterId", staffAccountVerification, async (req, res) => {

    let semesterId = req.params.semesterId;
    // const studentId = req.user;
    let studentId;
    let programme;
    let courses = [];
    let courseplan = {};
    let coursePlans = [];

    // -----------------CALL THE FUNCTION-------------------------


    const students = await Student.findAll();
    // console.log("students::", students);


    if (students) {
        for (const s of students) {
            courseplan = {};
            courses = [];

            studentId = s.dataValues.studentID;
            courseplan["studentId"] = studentId;
            studentName = s.dataValues.firstName + " " + s.dataValues.lastName;
            courseplan["studentName"] = studentName;

            programmeId = s.dataValues.programmeId;
            const programme = await Programme.findOne({ where: { id: programmeId } });
            programmeName = programme.name;
            courseplan["programmeName"] = programmeName;

            const advisingSession = await AdvisingSession.findOne({ where: { studentId, semesterId } });
            // console.log("advising session: ", advisingSession);
            
            if (advisingSession) {
                let sessionId = advisingSession.dataValues.id;
                const SelectedCourses = await SelectedCourse.findAll({ where: { advisingSessionId: sessionId } })
                // console.log("advisesCourses: ", SelectedCourses);

                for (let ac of SelectedCourses) {
                    courses.push(ac.courseCode);
                    // console.log("courses: ", ac.courseCode);
                }
                courseplan["courses"] = courses;

            } else {
                courseplan["courses"] = [];
            }




            coursePlans.push(courseplan);


        }
    }





    // console.log("COURSEPLAN:::> ",coursePlans);
    res.json({
        "Course Plans: ": coursePlans
    });

});


//#region 

// parserCSV
const { parseCSVData } = require('../utilities/csvParser');
const multer = require('multer');
const { or } = require("sequelize");
const SelectedCourse = require("../models/SelectedCourse");

const upload = multer({ storage: multer.memoryStorage() })

// parse programme csv
router.post('/parse/programmeCourse', upload.single('file'), async (req, res) => {

    const csvData = req.file.buffer.toString('utf8');
    const results = await parseCSVData(csvData);
    //console.log("data found", results);


    // Create Programme Entries 
    for (let i = 0; i < results[0].data.length; i++) {

        //console.log("item number:: ", i);
        const programme = await Programme.findOne({
            where: {
                id: results[0].data[i],
                name: results[1].data[i]
            }
        });
        // console.log("programme::> ", programme);
        // console.log(" prog Id: ", results[0].data[i]);
        // console.log(" name: ", results[1].data[i]);

        if (programme === null) {
            console.log("new programme: ", results[1].data[i]);

            await Programme.create({
                id: results[0].data[i],
                name: results[1].data[i],
                faculty: results[2].data[i],
                department: results[3].data[i],
            })
                .then(() => {
                    // console.log(" Programmes Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

    }

    // Create Course Entries
    for (let i = 0; i < results[4].data.length; i++) {
        const course = await Course.findOne({
            where: {
                courseCode: results[4].data[i],
            }
        });

        // console.log("courseCode: ", results[4].data[i] );
        // console.log("courseTitle: ", results[5].data[i] );
        // console.log("level: ", results[6].data[i] );
        // console.log("semester: ", results[7].data[i] );
        // console.log("credits: ", results[8].data[i] );
        // console.log("description: ", results[9].data[i] );

        if (!course) {
            await Course.create({
                courseCode: results[4].data[i],
                courseTitle: results[5].data[i],
                level: results[6].data[i],
                semester: results[7].data[i],
                credits: results[8].data[i],
                description: results[9].data[i],
            })
                .then(() => {
                    // console.log("Courses Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

    }


    // Create ProgrammeCourse Entries
    let count = 0;
    for (let i = 0; i < results[4].data.length; i++) {

        for (let j = 0; j < results[0].data.length; j++) {

            const programmeCourse = await ProgrammeCourse.findOne({
                where: {
                    courseCode: results[4].data[i],
                    programmeId: results[0].data[j],
                }
            });

            if (!programmeCourse) {
                await ProgrammeCourse.create({
                    courseCode: results[4].data[i],
                    programmeId: results[0].data[j],
                    typeId: results[12].data[count],
                })
                    .then(() => {
                        // console.log("Programme Courses Created!");
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });
            }

            count++;

        }

    }


    // Create Prerequisite and Antirequisite Entries
    for (let i = 0; i < results[4].data.length; i++) {

        const prereqCourseCodes = results[10].data[i].split(',');
        const antireqCourseCodes = results[11].data[i].split(',');

        for (let j = 0; j < prereqCourseCodes.length; j++) {

            const prerequisite = await Prerequisite.findOne({
                where: {
                    courseCode: results[4].data[i],
                    prerequisiteCourseCode: prereqCourseCodes[j],
                }
            });

            // console.log("courseCode: ", results[4].data[i]);
            // console.log("prereq: ", prereqCourseCodes[j]);

            if (!prerequisite) {
                await Prerequisite.create({
                    courseCode: results[4].data[i],
                    prerequisiteCourseCode: prereqCourseCodes[j]
                })
                    .then(() => {
                        //console.log("Created!");
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });
            }

        }

        for (let j = 0; j < antireqCourseCodes.length; j++) {

            const antirequisite = await Antirequisite.findOne({
                where: {
                    courseCode: results[4].data[i],
                    antirequisiteCourseCode: antireqCourseCodes[j],
                }
            });

            // console.log("courseCode: ", results[4].data[i]);
            // console.log("prereq: ", prereqCourseCodes[j]);

            if (!antirequisite) {
                await Antirequisite.create({
                    courseCode: results[4].data[i],
                    antirequisiteCourseCode: antireqCourseCodes[j]
                })
                    .then(() => {
                        //console.log("Created!");
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });
            }

        }

    }


    return res.status(200).send("CSV parsed, programmes, courses, preqequisites, antirequisites and programmeCourses added!");

});

//#endregion





// ====================--PARSE XLSX--====================

const express = require("express");
const { parse_xlsx } = require("../utilities/xlsx_parser.js");

//parse programmecourse XLSX
router.post('/parse/programmeCourseXLSX', upload.single('file'), async (req, res) => {

    try {
        const xlsxData = req.file.buffer; // XLSX file buffer
        const [sheetdata1, sheetdata2] = parse_xlsx(xlsxData);

        const { courses, programmes, programmeCourses, groups, prerequisites, antirequisites } = sheetdata1;
        const { types, electiveRequirements } = sheetdata2;

        // ==========--------put courses in database
        /**/
        for (let i = 0; i < courses.length; i++) {
            // console.log("courseCode::> ",courses[i].courseCode);
            try {

                // check if courses is already added
                const course = await Course.findOne({ where: { courseCode: courses[i].courseCode } });

                if (course) {
                    console.log("course exist");

                }
                else {//if course is not added
                    await Course.create({
                        courseCode: courses[i].courseCode,
                        courseTitle: courses[i].courseTitle,
                        credits: courses[i].credits,
                        level: courses[i].level,
                        semester: courses[i].semester,
                        department: courses[i].department,
                        description: courses[i].description,
                    })
                    console.log("create course");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }

        }


        // ==========--------put programmes in database
        /**/
        for (let i = 0; i < programmes.length; i++) {
            try {

                // check if programme is already added
                const programme = await Programme.findOne({ where: { id: programmes[i].programmeID } });
                // console.log("programme::> ",programme);
                if (programme) {
                    console.log("programme exist");

                }
                else {//if programme is not added
                    await Programme.create({
                        id: programmes[i].programmeId,
                        name: programmes[i].name,
                        faculty: programmes[i].faculty,
                        department: programmes[i].department,
                    })
                    console.log("programme created");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }
        }


        // ==========--------put programmeCourses in database
        /*  */
        for (let i = 0; i < programmeCourses.length; i++) {
            try {
                // check if programmeCourse is already added
                const programmeCourse = await ProgrammeCourse.findOne({ where: { programmeId: programmeCourses[i].programmeId, courseCode: programmeCourses[i].courseCode } });
                // console.log("programmeCourse::> ",programmeCourse);
                if (programmeCourse) {
                    console.log("programme course exist");

                }
                else {//if programme course is not added
                    await ProgrammeCourse.create({
                        programmeId: programmeCourses[i].programmeId,
                        courseCode: programmeCourses[i].courseCode,
                        typeId: programmeCourses[i].typeId,
                    })
                    console.log("programme course created");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }
        }



        // ==========--------put coursegroups into database
        /* */
        for (let i = 0; i < groups.length; i++) {

            let group = await Group.create();

            for (let j = 0; j < groups[i].courseCode.length; j++) {
                let courseCode = groups[i].courseCode[j];
                await CourseGroup.create({
                    groupId: group.id,
                    courseCode: courseCode
                });
            }
        }


        // ==========--------put prerequisites into the database
        /**/
        // console.log("!!!!!", prerequisites);
        for (let i = 0; i < prerequisites.length; i++) {

            console.log("Prerequisite:::> ", prerequisites[i]);

            const prerequisite = await Prerequisite.findOne({ where: { courseCode: prerequisites[i].courseCode, programmeId: prerequisites[i].programmeId, groupId: prerequisites[i].groupId } })

            if (!prerequisite) {
                console.log("create prereq");
                await Prerequisite.create({
                    courseCode: prerequisites[i].courseCode,
                    groupId: prerequisites[i].groupId,
                    programmeId: prerequisites[i].programmeId,
                });
            }


        }

        // ==========--------put antirequisites into the database
        /**/
        // console.log("!!!!!", antirequisites);
        for (let i = 0; i < antirequisites.length; i++) {

            // console.log("Antirequisite:::> ", antirequisites[i]);

            const antirequisite = await Antirequisite.findOne({ where: { courseCode: antirequisites[i].courseCode, antirequisiteCourseCode: antirequisites[i].antirequisiteCourseCode } })

            if (!antirequisite) {
                // console.log("create prereq");
                await Antirequisite.create({
                    courseCode: antirequisites[i].courseCode,
                    antirequisiteCourseCode: antirequisites[i].antirequisiteCourseCode,
                });
            }


        }


        // ==========--------put types into the database
        // console.log(types);
        /**/
        for (let i = 0; i < types.length; i++) {
            const type = await Type.findOne({ where: { type: types[i].type } });
            if (!type) {
                await Type.create({
                    type: types[i].type
                });
            }
        }


        // ==========--------put electiveRequirements into the database
        // console.log(electiveRequirements);
        for (let i = 0; i < electiveRequirements.length; i++) {
            const electiveRequirement = await ElectiveRequirement.findOne({ where: { typeId: electiveRequirements[i].typeId, programmeId: electiveRequirements[i].programmeId } });
            if (!electiveRequirement) {
                await ElectiveRequirement.create({
                    typeId: electiveRequirements[i].typeId,
                    programmeId: electiveRequirements[i].programmeId,
                    amount: electiveRequirements[i].amount
                });
            }
        }



        // console.log("Prerequisites: ", prerequisites);
        // console.log("Antirequisites: ", antirequisites);

        console.log("XLSX parsed and data processed successfully.");
        return res.status(200).json({
            message: "XLSX parsed and data processed successfully.",

            sheetdata1,
            //   sheetdata2,
        });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send("Server Error");
    }


});



router.get("/degreeProgress/all", staffAccountVerification, async (req, res) => {

    let studentId;
    const students = await Student.findAll();
    let studentsProgress = [];
    let gpa;

    for (let s of students) {
        studentId = s.dataValues.studentID;
        let studentName = s.dataValues.firstName + " " + s.dataValues.lastName;
        let programmeId = s.dataValues.programmeId;

        let programme = await Programme.findOne({ where: { id: programmeId } });
        let programmeName = programme.name;

        const transcript = await Transcript.findOne({ where: { studentID: studentId } });
        if (transcript) {
            gpa = transcript.dataValues.gpa
        } else {
            gpa = "unknown";
        }

        // console.log("programme Name: ", programmeName);

        // console.log("studetId: ", studentId);
        // console.log("student name: ", studentName);
        // console.log("Programme ID: ", programmeId);

        //#region 
        // get all the data for the function


        // get course codes of courses completed by student
        const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
        let studentCourseCodes = [];
        for (i = 0; i < studentCourses.length; i++) {
            studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
        }
        // console.log("student courses: ", studentCourseCodes);


        // Get programme id from student model
        const student = await Student.findOne({ where: { studentID: studentId } });
        if (student) {
            programmeId = student.dataValues.programmeId;

            // console.log("student: ", student.dataValues.programmeId);
        }

        //  get programme courses for programmeId
        const programmeCourse = await ProgrammeCourse.findAll({ where: { programmeId } });
        let programmeCourses = [];
        for (i = 0; i < programmeCourse.length; i++) {
            programmeCourses.push(programmeCourse[i].dataValues);
        }
        // console.log("programmeCourse: ", programmeCoursess);

        //  get courses
        let course = await Course.findAll();
        let courses = [];
        for (i = 0; i < course.length; i++) {
            courses.push(course[i].dataValues);
        }
        //  console.log("courses: ", courses);

        // get programmeCreditRequirements
        let pcrs = await PCR.findAll({ where: { programmeId } });
        let programmeCreditRequirements = [];
        for (i = 0; i < pcrs.length; i++) {
            programmeCreditRequirements.push(pcrs[i].dataValues);
        }
        // console.log("PCR: ", programmeCreditRequirements);

        // get types
        let type = await Type.findAll();
        let types = [];
        for (i = 0; i < type.length; i++) {
            types.push(type[i].dataValues);
        }
        // console.log("types: ", types);
        //#endregion


        let degreeProgress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types);
        // console.log(degreeProgress.totalCompletedCredits);
        let studentProgress = {
            "studentId": studentId,
            "studentName": studentName,
            "programmeName": programmeName,
            "GPA": gpa,
            "credits": degreeProgress.totalCompletedCredits,
        }

        studentsProgress.push(studentProgress);

    }

    // console.log("Degree Progrress: ", degreeProgress);
    res.json({
        "Student Progress: ": studentsProgress
    });

})

router.get("/studentsSummary", staffAccountVerification, async (req, res) => {

    let studentID;
    let summary = {};
    let year1 = 0;
    let year2 = 0;
    let year3 = 0;
    let year4 = 0;
    let graduating =0;

    const students = await Student.findAll();

    for (let s of students) {
        if (s) {
            studentID = s.dataValues.studentID;
            let programmeId = s.dataValues.programmeId;

            //console.log("studentId: ", studentID);

            let transcript = await Transcript.findOne({ where: { studentID } });
            // console.log(transcript.admitTerm);
            if (transcript) {

                //#region 

                // get course codes of courses completed by student
                const studentCourses = await StudentCourse.findAll({ where: { studentId: studentID } });
                let studentCourseCodes = [];
                for (i = 0; i < studentCourses.length; i++) {
                    studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
                }
                // console.log("student courses: ", studentCourseCodes);

                //  get programme courses for programmeId
                const programmeCourse = await ProgrammeCourse.findAll({ where: { programmeId } });
                let programmeCourses = [];
                for (i = 0; i < programmeCourse.length; i++) {
                    programmeCourses.push(programmeCourse[i].dataValues);
                }
                // console.log("programmeCourse: ", programmeCoursess);

                //  get courses
                let course = await Course.findAll();
                let courses = [];
                for (i = 0; i < course.length; i++) {
                    courses.push(course[i].dataValues);
                }
                //  console.log("courses: ", courses);

                // get programmeCreditRequirements
                let pcrs = await PCR.findAll({ where: { programmeId } });
                let programmeCreditRequirements = [];
                for (i = 0; i < pcrs.length; i++) {
                    programmeCreditRequirements.push(pcrs[i].dataValues);
                }
                // console.log("PCR: ", programmeCreditRequirements);

                // get types
                let type = await Type.findAll();
                let types = [];
                for (i = 0; i < type.length; i++) {
                    types.push(type[i].dataValues);
                }

                //#endregion

                let yearsPassed = getStudentYear(transcript);
                let progress = getDegreeProgress( programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types );
                if (progress.remainingCredits === 0){
                    graduating++;
                }
                // console.log("progress: ", progress);

                if (yearsPassed === 1) {
                    year1++;
                } else if (yearsPassed === 2) {
                    year2++;
                } else if (yearsPassed === 3) {
                    year3++;
                } else if (yearsPassed > 3) {
                    year4++;
                }
            }

        }


    }

    summary = {
        "graduating": graduating,
        "year1": year1,
        "year2": year2,
        "year3": year3,
        ">3years": year4,
    }

    res.json({
        "Student Summary: ": summary
    });
    // console.log("summary: ", summary);

})


module.exports = router;
