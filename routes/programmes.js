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
        const { name, faculty, department } = req.body;

        // check if programmes is already added
        const programme = await Programme.findOne({ where: { name } });
        if (programme) {
            return res.status(401).send("Programme already exists.");
        }
        else {
            await Programme.create({
                name,
                faculty,
                department
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
router.post("/add/:programmeID/:courseCode/:typeID", async (req, res) => {
    try {
        // destructure data entered
        const { programmeID, courseCode, typeID } = req.body;
        console.log("LOG::> programmeID: ", programmeID);
        console.log("LOG::> courseCode: ", courseCode);
        console.log("LOG::> typeID: ", typeID);

        //check if course is already added to a programme
        const programmecourse = await ProgrammeCourse.findOne({ where: { programmeID: programmeID, courseCode: courseCode, typeID: typeID } });
        if (programmecourse) {
            return res.status(401).send("Course already added to this Programme.");
        }
        else {
            await ProgrammeCourse.create({
                programmeId: programmeID,
                courseCode: courseCode, 
                typeId: typeID,
            })
                .then(() => {
                    return res.status(200).send("Course added to Programme!");
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

// delete a selected programme from the database
router.delete("/delete/:programmename", async (req, res) => {
    try {
        const programme = await Programme.findOne({ where: { name: req.params.programmename } });
        if (!programme) {
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

        const programmeID = req.params.id;
        //console.log("LOG::> programmeID: ", programmeID);

        const programmeCourses = await ProgrammeCourse.findAll({ where: { programmeID: programmeID } });
        //console.log("LOG::> ProgrammeCourses: ", programmeCourses);

        if (!programmeCourses) {
            return res.status(404).send("Programme doesn't exists");
        }
        else {
            var i;
            let courseCodes = [];

            for (i = 0; i < programmeCourses.length; i++) {
                courseCodes.push(programmeCourses[i].dataValues.courseCode)
            }

            let courses = [];
            for (i = 0; i < programmeCourses.length; i++) {
                const course = await Course.findOne({ where: { courseCode: courseCodes[i] } });
                const progCourse = await ProgrammeCourse.findOne({ where: { programmeID: programmeID, courseCode: courseCodes[i] } });
                course.dataValues.type = progCourse.type;
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
