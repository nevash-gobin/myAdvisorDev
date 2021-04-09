/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Career = require("../models/Career");
const Course = require("../models/Course");
const CareerCourse = require("../models/CareerCourse");

// get all careers in the database
router.get("/all", async (req, res) => {
    try {
        // finds all the courses and responds with a json list 
        const careers = await Career.findAll();
        res.status(200).json(careers);
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
        const {name, description} = req.body;

        // check if courses is already added
        const career = await Career.findOne({where : { name }});
        if(career) {
            return res.status(401).send("Career already in database");
        }
        else {
            await Career.create({
                name,
                description,
            })
            .then(() => {
                return res.status(200).send("Career added!");
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

// update a selected career
router.put("/edit/:id", async (req, res) => {
    try {
        const {name, description} = req.body;

        const career = await Career.findOne({where: { id: req.params.id }});
        if(!career) {
            return res.status(401).send("Career not found.");
        }
        else {
            // updates course with new information
            if (name) {
                career.name = name;
            }
            if (description) {
                career.description = description;
            }

            await career.save();
            res.status(200).send("Career Updated");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// delete a career from the database
router.delete("/delete/:id", async (req, res) => {
    try {
        const career = await Career.findOne({where: { id: req.params.id }});
        if(!career) {
            return res.status(401).send("Career not found.");
        }
        else {

            await career.destroy();
            res.status(200).send("Career Removed");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get all career courses (all the course options for a future career)
router.get("/courses/:id", async (req, res) => {
    try {
        const careerCourses = await CareerCourse.findAll({where: { careerID: req.params.id }});
        
        if(!careerCourses) {
            return res.status(404).send("Career doesn't exists");
        }
        else {
            var i;
            let courseIDs = [];

            for (i = 0; i < careerCourses.length; i++){
                courseIDs.push(careerCourses[i].courseID)
            }
            
            let courses = [];
            for (i = 0; i < careerCourses.length; i++){
                const course = await Course.findOne({where: { id: courseIDs[i] }});
                courses.push(course);
            }

            res.status(202).json(courses);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
