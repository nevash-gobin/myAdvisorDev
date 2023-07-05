const router = require("express").Router();
const bcrypt = require("bcrypt");
const staffAccountVerification = require("../middleware/staffAccountVerification");

// import models
const Admin = require("../models/Admin");
const Student = require("../models/Student");
const AdvisingWindow = require("../models/AdvisingWindow");
const AdvisingSession = require("../models/AdvisingSession");
const PotentialGraduate = require("../models/PotentialGraduate");

// ---Routes---

// Create Admin Account
router.post("/create/admin", staffAccountVerification, async (req, res) => {
    try {
        const { adminID, firstName, lastName, email, password } = req.body

        // check if staff exists since duplicate usernames aren't allowed
        const admin = await Admin.findOne({ where: { "adminID": adminID } });
        if (admin) {
            return res.status(401).send("Administrator Account Already Exists!");
        }
        else {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);

            await Admin.create({
                adminID,
                firstName,
                lastName,
                email,
                password: passEncrypt,
            })
                .then(() => {
                    return res.status(200).send("Administrator Account Created Successfully!");
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

// Create Student Account
router.post("/create/student", async (req, res) => {
    try {
        // destructure data entered
        const { studentID, firstName, lastName, email, password } = req.body

        // check if student exists since duplicate usernames aren't allowed
        const student = await Student.findOne({ where: { "studentID": studentID } });
        if (student) {
            return res.status(401).send("Student Account Already Exist!");
        }
        else {
            const saltRounds = 10;      // saltRounds are needed to increase the degree of hashing
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);// passEncrypt is the encrypted version of the password entered which uses the salt created

            await Student.create({
                studentID,
                firstName,
                lastName,
                email,
                password: passEncrypt,
            })
                .then(() => {
                    return res.status(200).send("Student Account Created Successfully!");
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

// Get All Advising Sessions
router.get("/student/advising-sessions", async (req, res) => {
    try {
        const sessions = await AdvisingSession.findAll();
        res.status(200).json(sessions);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// parserCSV
const { parsercsv } = require('../utilities/parserCSV');

// parse programme csv
router.post('/parse/programmeCourse', upload.single('file'), async (req, res)=>{
    const {data} = await parsercsv(req.file.buffer);
    console.log("data "+ JSON.stringify(data));
//     try {
//         // destructure data entered
//         const {studentId, gpa, name, progress, credits, degree, major, admitTerm, degreeAttemptHours, degreePassedHours, degreeEarnedHours, degreeGpaHours, degreeQualityPoints} = data;
//         //console.log("credits "+credits);

//         // check if student is already added
//         const student = await Transcript.findOne({where : { studentId }});
//         if(student) {
//             return res.status(401).send("Student already exists.");
//         }
//         else {
//             await Transcript.create({
//                studentId,
//                gpa,
//                name,
//                progress,
//                credits,
//                degree,
//                major,
//                admitTerm,
//                degreeAttemptHours,
//                degreePassedHours,
//                degreeEarnedHours,
//                degreeGpaHours,
//                degreeQualityPoints
//             })
//             .catch(err => {
//                 console.log("Error: ", err.message);
//             });
//         }

//         // check if course for student is already added
//             for (var key in data){
//                 if (!(key === "studentId" || key === "gpa" || key === "name" || key === "progress" || key === "credits" || key === "degree" || key === "major" || key === "admitTerm" || key === "degreeAttemptHours" || key === "degreePassedHours" || key === "degreeEarnedHours" || key === "degreeGpaHours" || key === "degreeQualityPoints")) {//if not equal to these
//                     var courseCode = key;
//                     var courseTitle = data[key][0]
//                     var grade = data[key][1];

//                     const courses = await StudentCourses.findOne({where: { studentId, courseCode }});
//                     if(courses) {
//                         return res.status(401).send("Course for student already exists.");
//                     }
//                     else {
//                         await StudentCourses.create({
//                             studentId,
//                             courseCode,
//                             courseTitle,
//                             grade,
//                         })
//                         .catch(err => {
//                             console.log("Error: ", err.message);
//                         });
//                     } 
//                 }
//             }
//             return res.status(200).send("Student courses added!");
        

//     }
//     catch (err) {
//         console.log("Error: ", err.message);
//         res.status(500).send("Server Error");
//     }
  });




module.exports = router;
