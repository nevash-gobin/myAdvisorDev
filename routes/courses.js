/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Course = require("../models/Course");

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
    try {
        // destructure data entered
        const {courseCode, courseTitle, credits, level, semester, prerequisites, description} = req.body;

        // check if courses is already added
        const course = await Course.findOne({where : { courseCode }});
        if(course) {
            return res.status(401).send("Course already exists.");
        }
        else {
            await Course.create({
                courseCode,
                courseTitle,
                credits,
                level,
                semester,
                prerequisites,
                description,
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
        const {courseCode, courseTitle, credits, level, semester, prerequisites, description} = req.body;

        const course = await Course.findOne({where: { courseCode: req.params.code }});
        if(!course) {
            return res.status(401).send("Course not found.");
        }
        else {
            // updates course with new information
            if (couseCode || courseTitle || credits || level || semester || prerequisites || description) {
                course.courseCode = courseCode;
                course.courseTitle = courseTitle;
                course.credits = credits;
                course.level = level;
                course.semester = semester;
                course.prerequisites = prerequisites;
                course.description = description;
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
router.put("/delete/:code", async (req, res) => {
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

module.exports = router;
