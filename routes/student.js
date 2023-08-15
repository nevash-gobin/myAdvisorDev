/* 
    constants to enable connectivity between components and encryption using bcrypt
    bcrypt and saltRounds enable authorization and encryption
    jwt uses the passport module to create and store a user token
*/
const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentAccountVerification = require("../middleware/studentAccountVerification");

const { getEligibleCourses } = require("../controllers/getEligibleCourses");
const { getDegreeProgress } = require("../controllers/getDegreeProgress");
const { getPlannedCourses } = require("../controllers/getPlannedCourses");
const { getCoursePlan } = require("../controllers/getCoursePlan");

const { Sequelize } = require('sequelize');

// import models
const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");
const AdvisingWindow = require('../models/AdvisingWindow')

// save advising session
router.post("/academic-advising/session/:studentId", studentAccountVerification, async (req, res) => {
    try {
        // get current student details
        const studentID = req.body.studentID;
        const student = await Student.findOne({ where: { studentID: req.body.studentID } });

        // setup date format and get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const session = await AdvisingSession.findOne({ where: { studentId: student.studentID } });
        //console.log(student.studentID);
        //const window = await AdvisingWindow.findOne({ where: { id: 1 } });

        if (!session) {
            await AdvisingSession.create({
                studentId: student.studentID,
                sessionDate: today,
                semesterId: req.body.semester
            })
                .then(() => {
                    return res.status(200).send("Advising Session Completed");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }
        else {
            await session.destroy();

            await AdvisingSession.create({
                studentId: student.studentID,
                sessionDate: today,
                semesterId: req.body.semester
            })
                .then(() => {
                    return res.status(200).send("Advising Session Completed");
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

const StudentCourse = require("../models/StudentCourse");
const Transcript = require("../models/Transcript");
const Programme = require("../models/Programme");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const Semester = require("../models/Semester");
const SemesterCourses = require("../models/semesterCourse");
const Prerequisite = require("../models/Prerequisite");
const Antirequisite = require("../models/Antirequisite");
const CourseGroup = require("../models/CourseGroup");
const Course = require("../models/Course");
const PCR = require("../models/ElectiveRequirement");
const Type = require("../models/Type");


router.get("/eligilbeCourses/:semesterId", studentAccountVerification, async (req, res) => {

    let semesterId = req.params.semesterId;
    const studentId = req.user;
    // console.log("studentId: ", studentId);
    // console.log("semesterId: ", semesterId);
    let programme;

    // get all the data for the function

    //#region 

    // get course codes of courses completed by student
    const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
    let studentCourseCodes = [];
    for (i = 0; i < studentCourses.length; i++) {
        studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
    }
    // console.log("student courses: ", studentCourseCodes);

    // Get programme id from student model
    const student = await Student.findOne({where: {studentID: studentId}});
    if(student){
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


    // get semesterCourses
    // const semester = await Semester.findOne({ order: [['createdAt', 'DESC']], });
    // let semesterId = semester.id;
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

    //#endregion


    // call the function


    eligibleCourses = getEligibleCourses(programmeId, studentCourseCodes, programmeCourses, semCourses, prereqs, antireqs, coursegroups);
    // console.log("eligibleCourses:  ", eligibleCourses);
    res.json({
        "eligibleCourses": eligibleCourses
    });


});

router.get("/degreeProgress", studentAccountVerification, async (req, res) => {

    // get logged in studentId
    const studentId = req.user;

    // get all the data for the function


    // get course codes of courses completed by student
    const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
    let studentCourseCodes = [];
    for (i = 0; i < studentCourses.length; i++) {
        studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
    }
    // console.log("student courses: ", studentCourseCodes);


    // Get programme id from student model
    const student = await Student.findOne({where: {studentID: studentId}});
    if(student){
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


    let degreeProgress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types);
    // console.log("Degree Progrress: ", degreeProgress);
    res.json({
        "DegreeProgress: ": degreeProgress
    });

})


router.get("/course-plan/:semesterId", studentAccountVerification, async (req, res) => {

    let semesterId = req.params.semesterId;
    const studentId = req.user;
    // const studentId = "816021684";
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
    const student = await Student.findOne({where: {studentID: studentId}});
    if(student){
        programmeId = student.dataValues.programmeId;
        // console.log("student: ", student.dataValues.programmeId);
    }

    // // Get student's transcript
    // const transcript = await Transcript.findOne({ where: { studentID: studentId }, });
    // switch (transcript.major) {
    //     case "Computer Science (Special)":
    //         programme = await Programme.findOne({ where: { name: "BSc " + transcript.major } })
    //         break;
    // };
    // let programmeId = programme.dataValues.id
    // console.log("Programme Id: ",programmeId);

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

    let coursePlan =  await getCoursePlan(programmeId, studentCourseCodes, programmeCourses, semCourses, prereqs, antireqs, coursegroups, courses, programmeCreditRequirements, types, studentId, semesterId);




    // console.log("COURSEPLAN:::> ",coursePlan);
    res.json({
        "Course Plan: ":coursePlan
    });

});


module.exports = router;




