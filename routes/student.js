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
const PotentialGraduate = require("../models/PotentialGraduate");
const Transcript = require("../models/Transcript");

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

//get a potential graduate
router.get("/a-potential-graduate/:studentId", async (req, res) => {
    try {
        const grad = await PotentialGraduate.findOne({where: { studentId: req.params.studentId }});
        //console.log("grad "+ grad);

        if(!grad) {
            return res.status(404).send("Potential Graduate " + req.params.studentId + " not found.");
        }
        else {
            res.status(202).json(grad);
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

//add student to potential graduates table
router.post("/potential-graduate/:studentId", studentAccountVerification, async (req, res) => {
    try{
        // get current student details
        const student = await Student.findOne({where: {username: req.params.studentId }});

        // get current student transcript details
        const studentTrancript = await Transcript.findOne({where: {studentId: req.params.studentId }});

        //check if potential graduate already exists
        const graduate = await PotentialGraduate.findOne({where:{studentId: student.username}});

        if(!graduate){//if there is no record for it
            await PotentialGraduate.create({
                studentId: student.username,
                name: studentTrancript.name,
                degree: studentTrancript.degree,
                major: studentTrancript.major,
                gpa: studentTrancript.gpa,
                admitTerm: studentTrancript.admitTerm
            })
            .then(() => {
                return res.status(200).send("Potential Graduate Added");
            })
            .catch(err => {
                console.log("Error: ", err.message);
            });
        }
        else{
            await graduate.destroy();

            await PotentialGraduate.create({
                studentId: student.username,
                name: studentTrancript.name,
                degree: studentTrancript.degree,
                major: studentTrancript.major,
                gpa: studentTrancript.gpa,
                admitTerm: studentTrancript.admitTerm
            })
            .then(() => {
                return res.status(200).send("Potential Graduate Added");
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

//delete a potential graduate from the database
router.delete("/potential-graduate/delete/:studentId", studentAccountVerification, async(req, res) => {
    
    try{
        const potentialGrad = await PotentialGraduate.findOne({where: {studentId: req.params.studentId}});
        if(!potentialGrad){
            return res.status(401).send("Potential Graduate " + req.params.studentId + " not found.");
        }
        else{
            await potentialGrad.destroy();
            res.status(200).send("Potential Graduate " + req.params.studentId + " removed.");
        }
    }
    catch(err){
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

//get all potential graduates from the database 
router.get("/potential-graduates/all", async(req, res) =>{
    try{
        //finds all potential graduates
        const allGraduates = await PotentialGraduate.findAll();
        res.status(200).json(allGraduates);
    }
    catch(err){
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;
