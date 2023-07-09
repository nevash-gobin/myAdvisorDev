const router = require("express").Router();
const bcrypt = require("bcrypt");
const staffAccountVerification = require("../middleware/staffAccountVerification");

// import models
const Admin = require("../models/Admin");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const Prerequisite = require("../models/Prerequisite");
const Antirequisite = require("../models/Antirequisite");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");

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
const { parsercsv, readCSV } = require('../utilities/parserCSV');
const { parseCSVData } = require('../utilities/csvParser');
const multer = require('multer');
const { or } = require("sequelize");
const upload = multer({ storage: multer.memoryStorage() })

// parse programme csv
router.post('/parse/programmeCourse', upload.single('file'), async (req, res) => {

    const csvData = req.file.buffer.toString('utf8');
    const results = await parseCSVData(csvData);
    console.log("data found", results);


    // // Create Programme Entries 
    // for (let i = 0; i < results[0].data.length; i++) {

    //     //console.log("item number:: ", i);
    //     const programme = await Programme.findOne({
    //         where: {
    //             id: results[0].data[i],
    //             name: results[1].data[i]
    //         }
    //     });
    //     // console.log("programme::> ", programme);
    //     // console.log(" prog Id: ", results[0].data[i]);
    //     // console.log(" name: ", results[1].data[i]);

    //     if (programme === null) {
    //         console.log("new programme: ", results[1].data[i]);

    //         await Programme.create({
    //             id: results[0].data[i],
    //             name: results[1].data[i],
    //             faculty: results[2].data[i],
    //             department: results[3].data[i],
    //         })
    //             .then(() => {
    //                 // console.log(" Programmes Created!");
    //             })
    //             .catch(err => {
    //                 console.log("Error: ", err.message);
    //             });
    //     }

    // }

    // // Create Course Entries
    // for (let i = 0; i < results[4].data.length; i++) {
    //     const course = await Course.findOne({
    //         where: {
    //             courseCode: results[4].data[i],
    //         }
    //     });

    //     // console.log("courseCode: ", results[4].data[i] );
    //     // console.log("courseTitle: ", results[5].data[i] );
    //     // console.log("level: ", results[6].data[i] );
    //     // console.log("semester: ", results[7].data[i] );
    //     // console.log("credits: ", results[8].data[i] );
    //     // console.log("description: ", results[9].data[i] );

    //     if (!course) {
    //         await Course.create({
    //             courseCode: results[4].data[i],
    //             courseTitle: results[5].data[i],
    //             level: results[6].data[i],
    //             semester: results[7].data[i],
    //             credits: results[8].data[i],
    //             description: results[9].data[i],
    //         })
    //             .then(() => {
    //                 // console.log("Courses Created!");
    //             })
    //             .catch(err => {
    //                 console.log("Error: ", err.message);
    //             });
    //     }

    // }


    // // Create ProgrammeCourse Entries
    // let count=0;
    // for (let i = 0; i < results[4].data.length; i++) {

    //     for (let j = 0; j < results[0].data.length; j++) {

    //         const programmeCourse = await ProgrammeCourse.findOne({
    //             where: {
    //                 courseCode: results[4].data[i],
    //                 programmeId: results[0].data[j],
    //             }
    //         });

    //         if (!programmeCourse) {
    //             await ProgrammeCourse.create({
    //                 courseCode: results[4].data[i],
    //                 programmeId: results[0].data[j],
    //                 typeId: results[12].data[count],
    //             })
    //                 .then(() => {
    //                     // console.log("Programme Courses Created!");
    //                 })
    //                 .catch(err => {
    //                     console.log("Error: ", err.message);
    //                 });
    //         }

    //         count++;

    //     }

    // }


    // Create Prerequisite Entries
    for (let i = 0; i < results[4].data.length; i++) {

        const prereqCourseCodes = results[10].data[i].split(',');

        for (let j = 0; j < prereqCourseCodes.length; j++) {

            const prerequisite = await Prerequisite.findOne({
                where: {
                    courseCode: results[4].data[i],
                    prerequisiteCourseCode: prereqCourseCodes[j],
                }
            });

            console.log("courseCode: ", results[4].data[i]);
            console.log("prereq: ", prereqCourseCodes[j]);

            if (!prerequisite) {
                await Prerequisite.create({
                    courseCode: results[4].data[i],
                    prerequisiteCourseCode: prereqCourseCodes[j]
                })
                    .then(() => {
                        //console.log("Created!");
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });
            }

        }







    }





    return res.status(200).send("CSV parsed, programmes, courses and programmeCourses added!");

});




module.exports = router;
