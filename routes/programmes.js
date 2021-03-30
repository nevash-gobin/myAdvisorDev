/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Programme = require("../models/Programme");
const ProgrammeCourse = require("../models/ProgrammeCourse");

// get all programmes in the database
router.get("/all", async (req, res) => {
    try {
        // finds all the programmes and responds with a json list 
        const programmes = await Programme.findAll();
        res.status(200).json(programmes);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get all programme courses (all the courses a specfic programme offers)
router.get("/offered-courses/:id", async (req, res) => {
    try {
        const programmeCourses = await ProgrammeCourse.findAll({where: { programmeID: req.params.id }});
        
        if(!programmeCourses) {
            return res.status(404).send("Programme doesn't exists");
        }
        else {
            // console.log(programmeCourses.dataValues.courseID);
            res.status(202).json(programmeCourses);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
