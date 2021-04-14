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

// import models
const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");
const AdvisingWindow = require('../models/AdvisingWindow');
const Course = require("../models/Course");

// save advising session
router.post("/academic-advising/session/:studentId", studentAccountVerification, async (req, res) => {
    try {
        // get current student details
        const student = await Student.findOne({where: {username: req.params.studentId }});
        // setup date format and get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm =  String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        const session = await AdvisingSession.findOne({where: { studentID: student.username }});
        const window = await AdvisingWindow.findOne({where: { id: 1 }});

        if(today > window.advisingEnd){
            console.log("No advising sessions open");
            return res.status(200).send("Cannot add session outside of advising window!");
        }
        if(!session){
            await AdvisingSession.create({
                studentID: student.username,
                sessionDate: today
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
                studentID: student.username,
                sessionDate: today
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

module.exports = router;
