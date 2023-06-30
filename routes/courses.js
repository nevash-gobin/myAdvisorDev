/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Course = require("../models/Course");
const Career = require("../models/Career");
const CareerCourse = require("../models/CareerCourse");

// imports sequelize module
const Sequelize = require("sequelize");

// get all courses in the database
router.get("/all", async (req, res) => {

    try {
        // finds all the courses and responds with a json list 
        const courses = await Course.findAll();
        res.status(200).json(courses);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get a course in the database
router.get("/view/:code", async (req, res) => {
    try {
        const course = await Course.findOne({ where: { courseCode: req.params.code } });

        if (!course) {
            return res.status(404).send("Course not found.");
        }
        else {
            res.status(202).json(course);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// add a course to the database
router.post("/add", async (req, res) => {
    try {
        // destructure data entered
        const { courseCode, courseTitle, credits, level, semester, prerequisites, description, coursework, finalExam, groupProject, individualWork, practicalCoursework, courseworkExam, projectPres, project, presentation, assignment, labAssessment, midSemesterMcq, projectReport, projectReportPres, projectAndPres, performanceReports, projectSoftwareApp } = req.body;

        // check if courses is already added
        const course = await Course.findOne({ where: { courseCode } });
        if (course) {
            return res.status(401).send("Course already exists.");
        }
        else {//if course is not added
            await Course.create({
                courseCode,
                courseTitle,
                credits,
                level,
                semester,
                prerequisites,
                description,
                coursework,
                finalExam,
                groupProject,
                individualWork,
                practicalCoursework,
                courseworkExam,
                projectPres,
                project,
                presentation,
                assignment,
                labAssessment,
                midSemesterMcq,
                projectReport,
                projectReportPres,
                projectAndPres,
                performanceReports,
                projectSoftwareApp
            })
                .then(() => {
                    return res.status(200).send("Course added!");
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

// update a selected course
router.put("/edit/:code", async (req, res) => {
    try {
        const { courseCode, courseTitle, credits, level, semester, description, coursework, finalExam, groupProject, individualWork, practicalCoursework, courseworkExam, projectPres, project, presentation, assignment, labAssessment, midSemesterMcq, projectReport, projectReportPres, projectAndPres, performanceReports, projectSoftwareApp } = req.body;

        const course = await Course.findOne({ where: { courseCode: req.params.code } });

        if (!course) {
            return res.status(401).send("Course not found.");
        }
        else {
            // updates course with new information
            if (courseCode) {
                course.courseCode = courseCode;
            }
            if (courseTitle) {
                course.courseTitle = courseTitle;
            }
            if (credits) {
                course.credits = credits;
            }
            if (level) {
                course.level = level;
            }
            if (semester) {
                course.semester = semester;
            }
            if (description) {
                course.description = description;
            }

            if (coursework) {
                course.coursework = coursework;
            }
            else {//if null
                course.coursework = coursework; //set to null
            }

            if (finalExam) {
                course.finalExam = finalExam;
            }
            else {//if null
                course.finalExam = finalExam; //set to null
            }

            if (groupProject) {
                course.groupProject = groupProject;
            }
            else {//if null
                course.groupProject = groupProject; //set to null
            }

            if (individualWork) {
                course.individualWork = individualWork;
            }
            else {//if null
                course.individualWork = individualWork; //set to null
            }

            if (practicalCoursework) {
                course.practicalCoursework = practicalCoursework;
            }
            else {//if null
                course.practicalCoursework = practicalCoursework; //set to null
            }

            if (courseworkExam) {
                course.courseworkExam = courseworkExam;
            }
            else {//if null
                course.courseworkExam = courseworkExam; //set to null
            }

            if (projectPres) {
                course.projectPres = projectPres;
            }
            else {//if null
                course.projectPres = projectPres; //set to null
            }

            if (project) {
                course.project = project;
            }
            else {//if null
                course.project = project; //set to null
            }

            if (presentation) {
                course.presentation = presentation;
            }
            else {//if null
                course.presentation = presentation; //set to null
            }

            if (assignment) {
                course.assignment = assignment;
            }
            else {//if null
                course.assignment = assignment; //set to null
            }

            if (labAssessment) {
                course.labAssessment = labAssessment;
            }
            else {//if null
                course.labAssessment = labAssessment; //set to null
            }

            if (midSemesterMcq) {
                course.midSemesterMcq = midSemesterMcq;
            }
            else {//if null
                course.midSemesterMcq = midSemesterMcq; //set to null
            }

            if (projectReport) {
                course.projectReport = projectReport;
            }
            else {//if null
                course.projectReport = projectReport; //set to null
            }

            if (projectReportPres) {
                course.projectReportPres = projectReportPres;
            }
            else {//if null
                course.projectReportPres = projectReportPres;//set to null
            }

            if (projectAndPres) {
                course.projectAndPres = projectAndPres;
            }
            else {//if null
                course.projectAndPres = projectAndPres;//set to null
            }

            if (performanceReports) {
                course.performanceReports = performanceReports;
            }
            else {//if null
                course.performanceReports = performanceReports;//set to null
            }

            if (projectSoftwareApp) {
                course.projectSoftwareApp = projectSoftwareApp;
            }
            else {//if null
                course.projectSoftwareApp = projectSoftwareApp;//set to null
            }

            await course.save();
            res.status(200).send("Course Updated");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// delete a selected course from the database
router.delete("/delete/:code", async (req, res) => {
    try {
        const course = await Course.findOne({ where: { courseCode: req.params.code } });
        if (!course) {
            return res.status(401).send("Course not found.");
        }
        else {
            await course.destroy();
            res.status(200).send("Course Removed");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get all career tags for a course
router.get("/careers/:courseCode", async (req, res) => {
    try {
        const courseCode = req.params.courseCode;
        // console.log("LOG::> courseCode: ", courseCode);

        const courseCareers = await CareerCourse.findAll({ where: { courseCode: courseCode } });
        // console.log("LOG::> courseCarrers: ", courseCareers);

        if (!courseCareers) {
            return res.status(404).send("Course doesn't exist");
        }
        else {
            var i;
            let careerIDs = [];

            for (i = 0; i < courseCareers.length; i++) {
                careerIDs.push(courseCareers[i].dataValues.id)
            }
            // console.log("LOG::> CareerIds: ", careerIDs);

            let careerNames = [];
            for (i = 0; i < courseCareers.length; i++) {
                const career = await Career.findOne({ where: { id: careerIDs[i] } });
                // console.log("LOG::> career: ", career);
                careerNames.push(career.dataValues.careerName);
            }

            res.status(202).json(careerNames);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

router.get("/prereqs/:id", async (req, res) => {
    const Op = Sequelize.Op;
    try {
        const prereqs = await Course.findAll({ where: { prerequisites: { [Op.like]: `%${req.params.id}%` } } });

        if (!prereqs) {
            return res.status(404).send("This course is not required for any other course");
        }
        else {
            res.status(202).json(prereqs);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
