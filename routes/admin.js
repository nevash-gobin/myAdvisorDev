/* 
    constants to enable connectivity between components and encryption using bcrypt
    bcrypt and saltRounds enable authorization and encryption
    jwt uses the passport module to create and store a user token
*/
const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const staffAccountVerification = require("../middleware/staffAccountVerification");

// import models
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const AdvisingWindow = require("../models/AdvisingWindow");
const AdvisingSession = require("../models/AdvisingSession");
const { response } = require("express");
const PotentialGraduate = require("../models/PotentialGraduate");

// add new student account
router.post("/students/create", async (req, res) => {
    try {
        // destructure data entered
        const {username, password} = req.body

        // check if student exists since duplicate usernames aren't allowed
        const user = await Student.findOne({where: { username }});
        if(user) {
            return res.status(401).send("Student already exists.");
        }
        else {
            // saltRounds are needed to increase the degree of hashing
            // passEncrypt is the encrypted version of the password entered which uses the salt created
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);

            await Student.create({
                username,
                password: passEncrypt,
            })
            .then(() => {
                return res.status(200).send("Student added!");
            })
            .catch (err => {
                    console.log("Error: ", err.message);
            });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// add new staff account
router.post("/staff/create", staffAccountVerification, async (req, res) => {
    try {
        const {username, password} = req.body

        // check if staff exists since duplicate usernames aren't allowed
        const user = await Staff.findOne({where: { username }});
        if(user) {
            return res.status(401).send("Staff member already exists.");
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);

            await Staff.create({
                username,
                password: passEncrypt,
            })
            .then(() => {
                return res.status(200).send("Staff added!");
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

// set or update advising window
router.post("/academic-advising/window", async (req, res) => {
    try {
        const {advisingStart, advisingEnd, semester} = req.body

        const advisingWindow = await AdvisingWindow.findOne({where: { id: 1 }});

        if(!advisingWindow){
            await AdvisingWindow.create({
                advisingStart,
                advisingEnd,
                semester
            })
            .then(() => {
                return res.status(200).send("Window Set for Semester");
            })
            .catch(err => {
                console.log("Error: ", err.message);
            });
        } else{
            if (advisingStart) {
                advisingWindow.advisingStart = advisingStart;
            }
            if (advisingEnd) {
                advisingWindow.advisingEnd = advisingEnd;
            }
            if(semester) {
                advisingWindow.semester = semester;
            }
            await advisingWindow.save();
            res.status(200).send("Advising Window Updated");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get advising window
router.get("/academic-advising/window", async (req, res) => {
    try {
        const advisingWindow = await AdvisingWindow.findOne({where: { id: 1 }});
        res.status(200).json(advisingWindow);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get student sessions from the database
router.get("/academic-advising/students/sessions", async (req, res) => {
    try {
        // get all the sessions for current advising period
        const sessions = await AdvisingSession.findAll();
        res.status(200).json(sessions);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

//get the potential graduates from the database
router.get("/potential-graduates/students", async(req, res) => {
    try{
        //get all the potential graduates
        const potGrad = await PotentialGraduate.findAll();
        res.status(200).json(potGrad);
    }
    catch(err){
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
