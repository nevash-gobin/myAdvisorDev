//Initialise file upload components
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const { parse } = require('../utilities/parser');
const studentAccountVerification = require("../middleware/studentAccountVerification");
/**
 * initalizes express router and database connection
 */
const router = require("express").Router();
const db = require("../db");

// import models
const Transcript = require("../models/Transcript");
const StudentCourses = require("../models/StudentCourse");


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
        const student = await Transcript.findOne({ where: { studentID: req.params.studentId } });

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
        const student = await StudentCourses.findAll({ where: { studentId: req.params.studentId } });

        if (student.length == 0) {
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

// add a student's details to the database
//Add Transcript
router.post("/details/add", async (req, res) => {
    try {
        // destructure data entered
        const { studentId, gpa, name, progress, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints } = req.body;

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
                progress,
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
        const { studentId, courseCode, courseTitle, grade } = req.body;

        // create new entry
        await StudentCourses.create({
            studentId,
            courseCode,
            courseTitle,
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
    //console.log("res:" ,res);
    const { parsedText, ...data } = await parse(req.file.buffer);
    //console.log("LOG::> Data "+ JSON.stringify(data));
    try {
        // destructure data entered
        const { studentId, gpa, name, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints } = data;
        //console.log("credits "+credits);
        //console.log("LOG::> StudentId: ", studentId);


        // check if student is already added
        const student = await Transcript.findOne({ where: { studentID: studentId } });

        if (student) {
            return res.status(401).send("Student already exists.");
        }
        else {
            await Transcript.create({
                studentID: studentId,
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
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

        console.log("LOG::> Entering for loop");
        // check if course for student is already added
        for (var key in data) {
            //console.log("LOG::> Key: ", key);
            if (!(key === "studentId" || key === "gpa" || key === "name" || key === "progress" || key === "credits" || key === "degree" || key === "major" || key === "admitTerm" || key === "degreeAttemptHours" || key === "degreePassedHours" || key === "degreeEarnedHours" || key === "degreeGpaHours" || key === "degreeQualityPoints")) {//if not equal to these
                var courseCode = key;
                var courseTitle = data[key][0]
                var grade = data[key][1];

                const courses = await StudentCourses.findOne({ where: { studentId, courseCode } });
                //console.log("+++++!+!++!", courses);
                if (courses) {
                    return res.status(401).send("Course for student already exists.");
                }
                else {
                    await StudentCourses.create({
                        studentId,
                        courseCode,
                        courseTitle,
                        grade,
                    })
                        .catch(err => {
                            console.log("Error: ", err.message);
                        });

                    console.log("Created: ", courseCode);
                }
            }
        }
        return res.status(200).send("Student courses added!");


    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// update a selected student transcript
router.put("/details/edit/:studentId", async (req, res) => {
    try {
        const { studentId, gpa, name, progress, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints } = req.body;

        const student = await Transcript.findOne({ where: { studentID: req.params.studentId } });
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
router.get("/course/options", studentAccountVerification, async(req, res)=>{

    // Get studentId from the auth
    const studentId = req.user;

    // Get student's transcript
    const student = await Transcript.findOne({ where: { studentID: studentId } });
    console.log("Programme: ", student.major);
    
    // Get all the student's courses
    const studentCourses = await StudentCourses.findAll({ where: { studentId: studentId } });

    
    
    console.log("Programme: ", student.major);



});



module.exports = router;

