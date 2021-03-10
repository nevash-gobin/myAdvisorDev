//Initialise file upload components
const multer  = require('multer')
const upload = multer({storage: multer.memoryStorage()})
const { parse } = require('../utilities/parser');

/**
 * initalizes express router and database connection
 */
 const router = require("express").Router();
 const db = require("../db");
 
 // import models
 const Transcript = require("../models/Transcript");
 
 // get all student details in the database
 router.get("/all", async (req, res) => {
     try {
         // finds all the student details and responds with a json list 
         const details = await Transcript.findAll();
         res.status(200).json(details);
     }
     catch (err) {
         console.log("Error: ", err.message);
         res.status(500).send("Server Error");
     }
 });
 
 // get a student in the database
 router.get("/view/:studentId", async (req, res) => {
     try {
         const student = await Transcript.findOne({where: { studentId: req.params.studentId }});
 
         if(!student) {
             return res.status(404).send("Student not found.");
         }
         else {
             res.status(202).json(student);
         }
     }
     catch (err) {
         console.log("Error: ", err.message);
         res.status(500).send("Server Error");
     }
 });
 
 // add a student's details to the database
 router.post("/add", async (req, res) => {
     try {
         // destructure data entered
         const {studentId, gpa, name, progress, credits, degree, major, admitTerm} = req.body;
 
         // check if student is already added
         const student = await Transcript.findOne({where : { studentId }});
         if(student) {
             return res.status(401).send("Student already exists.");
         }
         else {
             await Transcript.create({
                studentId,
                gpa,
                name,
                progress,
                credits,
                degree,
                major,
                admitTerm,
             })
             .then(() => {
                 return res.status(200).send("Student added!");
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

 router.post('/parseForm', upload.single('file'), async (req, res)=>{
    const { parsedText, ...data} = await parse(req.file.buffer);
    try {
        // destructure data entered
        const {studentId, gpa, name, progress, credits, degree, major, admitTerm} = data;

        // check if student is already added
        const student = await Transcript.findOne({where : { studentId }});
        if(student) {
            return res.status(401).send("Student already exists.");
        }
        else {
            await Transcript.create({
               studentId,
               gpa,
               name,
               progress,
               credits,
               degree,
               major,
               admitTerm,
            })
            .then(() => {
                return res.status(200).send("Student added!");
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
  })
 
 // update a selected student
 router.put("/edit/:studentId", async (req, res) => {
     try {
        const {studentId, gpa, name, progress, credits, degree, major, admitTerm} = req.body;
 
         const student = await Transcript.findOne({where: { studentId: req.params.studentId }});
         if(!student) {
             return res.status(401).send("Student not found.");
         }
         else {
             // updates course with new information
             if (studentId) {
                student.studentId = studentId;
             }
             if (gpa) {
                student.gpa = gpa;
             }
             if (name) {
                student.name = name;
             }
             if (progress) {
                student.progress = progress;
             }
             if (credits) {
                student.credits = credits;
             }
             if (degree) {
                student.degree = degree;
             }
             if (major) {
                student.major = major;
             }
             if (admitTerm) {
                student.admitTerm = admitTerm;
             }
 
             await student.save();
             res.status(200).send("Student Updated");
         }
     }
     catch (err) {
         console.log("Error: ", err.message);
         res.status(500).send("Server Error");
     }
 });
 
 // delete a selected student from the database
 router.delete("/delete/:studentId", async (req, res) => {
     try {
         const student = await Transcript.findOne({where: { studentId: req.params.studentId }});
         if(!student) {
             return res.status(401).send("Student not found.");
         }
         else {
 
             await student.destroy();
             res.status(200).send("Student Removed");
         }
     }
     catch (err) {
         console.log("Error: ", err.message);
         res.status(500).send("Server Error");
     }
 });
 
 module.exports = router;
 