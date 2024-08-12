//Initialise file upload components
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const { parse } = require('../utilities/parser');
const studentAccountVerification = require("../middleware/studentAccountVerification");
const { Op, Transaction } = require('sequelize');
/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Transcript = require("../models/Transcript");
const StudentCourses = require("../models/StudentCourse");
const Semester = require("../models/Semester");
// import controllers
const { getStudentsCourses } = require('../controllers/getStudentCourses');
const { addStudentTranscript } = require('../controllers/addStudentTranscript');
const { addStudentTranscriptCourses } = require('../controllers/addStudentTranscriptCourses');
const { response } = require('express');
// get all student details in the database
//Get Transcript
router.get("/details/all", async (req, res) => {
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

// get all student courses in the database
router.get("/courses/all", async (req, res) => {
    try {
        // finds all the student courses and responds with a json list 
        const details = await StudentCourses.findAll();
        res.status(200).json(details);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get a student in the database
router.get("/details/view/:studentId", async (req, res) => {
    try {
        const student = await Transcript.findOne({ where: { studentId: req.params.studentId } });

        if (!student) {
            //return res.status(404).send("Student not found.");
            return res.status(404).json({ error: 'Student not found.' });
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

// get a student's course in the database
router.get("/courses/view", async (req, res) => {
    // destructure data entered

    try {
        const student = await StudentCourses.findOne({ where: { studentId: req.body.studentId } && { courseCode: req.body.courseCode } });
        //need year: derived from sem id via Semesters
        //need coursename: derived from courseCode via Course

        if (!student) {
            return res.status(404).send("Course for student not found.");
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

// get all of a student's course in the database
router.get("/courses/viewAll/:studentId", async (req, res) => {
    try {
        const path_student = req.params.studentId;
        let studentCourses = await getStudentsCourses(path_student);
        // console.log("Student Courses: ", studentCourses);
        res.status(200).json({
            "courses": studentCourses
        })
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// add a student's details to the database
//Add Transcript
router.post("/details/add", async (req, res) => {
    try {
        // destructure data entered
        const { studentId, gpa, name, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints } = req.body;

        // check if student is already added
        const student = await Transcript.findOne({ where: { studentId } });
        if (student) {
            return res.status(401).send("Student already exists.");
        }
        else {
            await Transcript.create({
                studentId,
                gpa,
                name,
                credits,
                degree,
                major,
                admitTerm,
                degreeAttemptHours,
                degreePassedHours,
                degreeEarnedHours,
                degreeGpaHours,
                degreeQualityPoints
            })
                .then(() => {
                    return res.status(200).send("Student details added!");
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

// add a student's courses to the database
router.post("/courses/add", async (req, res) => {
    try {
        // destructure data entered
        const { studentId, courseCode, semesterId, grade } = req.body;

        // create new entry
        await StudentCourses.create({
            studentId,
            courseCode,
            semesterId,
            grade
        })
            .then(() => {
                return res.status(200).send("Student courses added!");
            })
            .catch(err => {
                console.log("Error: ", err.message);
            });
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Add transcript by uploading transcript
router.post('/parseForm', upload.single('file'), async (req, res) => {
    try {
        // Ensure a file is provided
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        // Ensure the uploaded file is a PDF
        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).send('Only PDF files are allowed');
        }

        // Parse the PDF file
        const data = await parse(req.file.buffer);

        // Add the parsed data to the student's transcript courses
        const response = await addStudentTranscriptCourses(data);

        // Log the response
        console.log(response);

        // Send response back to the client
        res.status(response.status).send(response.msg);
    } catch (error) {
        console.error('Error parsing PDF or adding transcript courses:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// update a selected student transcript
router.put("/details/edit/:studentId", async (req, res) => {
    try {
        const { studentId, gpa, name, progress, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints } = req.body;

        const student = await Transcript.findOne({ where: { studentId: req.params.studentId } });
        if (!student) {
            return res.status(401).send("Student not found.");
        }
        else {
            // updates student with new information
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
            if (degreeAttemptHours) {
                student.degreeAttemptHours = degreeAttemptHours;
            }
            if (degreePassedHours) {
                student.degreePassedHours = degreePassedHours;
            }
            if (degreeEarnedHours) {
                student.degreeEarnedHours = degreeEarnedHours;
            }
            if (degreeGpaHours) {
                student.degreeGpaHours = degreeGpaHours;
            }
            if (degreeQualityPoints) {
                student.degreeQualityPoints = degreeQualityPoints;
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

// update a selected student's courses
router.put("/courses/edit", async (req, res) => {
    try {
        const student = await StudentCourses.findOne({ where: { studentId: req.body.studentId } && { courseCode: req.body.courseCode } });
        if (!student) {
            return res.status(401).send("Course for Student not found.");
        }
        else {
            // updates course with new information
            if (req.body.courseTitle) {
                student.courseTitle = req.body.courseTitle;
            }
            if (req.body.grade) {
                student.grade = req.body.grade;
            }

            await student.save();
            res.status(200).send("Courses for Student Updated");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// delete a selected student from the database
// Delete student transcript
router.delete("/details/delete/:studentId", async (req, res) => {
    try {
        const student = await Transcript.findOne({ where: { studentId: req.params.studentId } });
        if (!student) {
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

// delete a selected student's course from the database
router.delete("/courses/delete", async (req, res) => {

    try {
        const student = await StudentCourses.findOne({ where: { studentId: req.body.studentId } && { courseCode: req.body.courseCode } });
        if (!student) {
            return res.status(401).send("Course for Student not found.");
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


// delete all of a selected student's courses from the database
router.delete("/courses/deleteAll/:studentId", async (req, res) => {
    try {
        const student = await StudentCourses.findAll({ where: { studentId: req.params.studentId } });
        if (!student) {
            return res.status(401).send("Courses for Student not found.");
        }
        else {
            for (i = 0; i < student.length; i++) {
                await student[i].destroy();
            }
            res.status(200).send("Courses for Student Removed");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});


// Get registerable courses
router.get("/course/options", studentAccountVerification, async (req, res) => {

    // Get studentId from the auth
    const studentId = req.user;

    // Get student's transcript
    const student = await Transcript.findOne({ where: { studentId: studentId } });
    console.log("Programme: ", student.major);

    // Get all the student's courses
    const studentCourses = await StudentCourses.findAll({ where: { studentId: studentId } });



    console.log("Programme: ", student.major);



});



module.exports = router;

