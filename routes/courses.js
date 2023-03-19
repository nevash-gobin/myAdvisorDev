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
        //console.log(courses);
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
        const course = await Course.findOne({where: { courseCode: req.params.code }});

        if(!course) {
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
    console.log(req);
    console.log(res);
    try {
        // destructure data entered
        const {courseCode, courseTitle, credits, level, semester, type, prerequisites, description, coursework, finalExam, groupProject, individualWork, practicalCoursework, courseworkExam, projectPres, project, presentation, assignment, labAssessment, midSemesterMcq, projectReport} = req.body;

        //if(finalExam){
            //console.log("Have something");
        //}
        // check if courses is already added
        const course = await Course.findOne({where : { courseCode }});
        if(course) {
            return res.status(401).send("Course already exists.");
        }
        else {//if course is not added
            await Course.create({
                courseCode, 
                courseTitle, 
                credits, 
                level, 
                semester, 
                type, 
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
                projectReport
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
        const {courseCode, courseTitle, credits, level, semester, type, prerequisites, description, coursework, finalExam, individualProjectPres, groupProjectPres, performanceReports} = req.body;

        const course = await Course.findOne({where: { courseCode: req.params.code }});
        if(!course) {
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
            if (type) {
                course.type = type;
            }
            if (prerequisites) {
                course.prerequisites = prerequisites;
            }
            if (description) {
                course.description = description;
            }
            if (coursework) {
                course.coursework = coursework;
            }
            if (finalExam) {
                course.finalExam = finalExam;
            }
            if (individualProjectPres) {
                course.individualProjectPres = individualProjectPres;
            }
            if (groupProjectPres) {
                course.groupProjectPres = groupProjectPres;
            }
            if (performanceReports) {
                course.performanceReports = performanceReports;
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
        const course = await Course.findOne({where: { courseCode: req.params.code }});
        if(!course) {
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
router.get("/careers/:id", async (req, res) => {
    try {
        const courseCareers = await CareerCourse.findAll({where: { courseID: req.params.id }});
        
        if(!courseCareers) {
            return res.status(404).send("Course doesn't exist");
        }
        else {
            var i;
            let careerIDs = [];
            
            for (i = 0; i < courseCareers.length; i++){
                careerIDs.push(courseCareers[i].careerID)
            }
            
            let careers = [];
            for (i = 0; i < courseCareers.length; i++){
                const career = await Career.findOne({where: { id: careerIDs[i] }});
                careers.push(career.name);
            }

            res.status(202).json(careers);
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
        const prereqs = await Course.findAll({where: { prerequisites: { [Op.like]: `%${req.params.id}%` }}});
        
        if(!prereqs) {
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
