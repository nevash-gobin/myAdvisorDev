/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Course = require("../models/Course");
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

// add a programme to the database
router.post("/add", async (req, res) => {
    try {
        // destructure data entered
        const {name} = req.body;

        // check if programmes is already added
        const programme = await Programme.findOne({where : { name }});
        if(programme) {
            return res.status(401).send("Programme already exists.");
        }
        else {
            await Programme.create({
                name,
            })
            .then(() => {
                return res.status(200).send("Programme added!");
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

//Add a course to a programme
router.post("/add/:programmeID/:courseID", async (req, res) => {
    try{
        // destructure data entered
        const {programmeID, courseID, type} = req.body;

        //check if course is already added to a programme
        const programmecourse = await ProgrammeCourse.findOne({where: {programmeID: req.params.programmeID, courseID: req.params.courseID}});
        if(programmecourse){
            return res.status(401).send("Course already added to this Programme.");
        }
        else{
            await ProgrammeCourse.create({
                programmeID, courseID, type,
            })
            .then(() => {
                return res.status(200).send("Course added to Programme!");
            })
            .catch(err => {
                console.log("Error: ", err.message);
            });
        }
    }
    catch(err){
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// delete a selected programme from the database
router.delete("/delete/:programmename", async (req, res) => {
    try {
        const programme = await Programme.findOne({where: { name: req.params.programmename }});
        if(!programme) {
            return res.status(401).send("Programme not found.");
        }
        else {
            await programme.destroy();
            res.status(200).send("Programme Removed");
        }
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
            var i;
            let courseIDs = [];

            for (i = 0; i < programmeCourses.length; i++){
                courseIDs.push(programmeCourses[i].courseID)
            }
            
            let courses = [];
            for (i = 0; i < programmeCourses.length; i++){
                const course = await Course.findOne({where: { id: courseIDs[i] }});
                const progCourse = await ProgrammeCourse.findOne({where: { programmeID: req.params.id, courseID: courseIDs[i] }});
                course.dataValues.type = progCourse.type;
                courses.push(course);
            }
            //console.log(courses);

            res.status(202).json(courses);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
