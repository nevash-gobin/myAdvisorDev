const router = require("express").Router();
const bcrypt = require("bcrypt");
const staffAccountVerification = require("../middleware/staffAccountVerification");
const { getEligibleCourses } = require("../controllers/getEligibleCourses");
const { getDegreeProgress } = require("../controllers/getDegreeProgress");
const { getPlannedCourses } = require("../controllers/getPlannedCourses");
const { getStudentCoursePlan } = require("../controllers/getStudentCoursePlan");
const { getCoursePlan } = require("../controllers/getCoursePlan.js");
const { getAllCoursePlans } = require("../controllers/getAllCoursePlans");
const { updatePlanStatus } = require("../controllers/updateCoursePlan.js")
// import models
const Admin = require("../models/Admin");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const Prerequisite = require("../models/Prerequisite");
const Group = require("../models/Group");
const CourseGroup = require("../models/CourseGroup");
const Antirequisite = require("../models/Antirequisite");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const Student = require("../models/Student");
const AdvisingSession = require("../models/AdvisingSession");
const Semester = require("../models/Semester");
const Type = require("../models/Type");
const ElectiveRequirement = require("../models/ElectiveRequirement");

const StudentCourse = require("../models/StudentCourse");
const Transcript = require("../models/Transcript");
const SemesterCourses = require("../models/SemesterCourse");
// const CourseGroup = require("../models/CourseGroup");
const PCR = require("../models/ElectiveRequirement");
// const Type = require("../models/Type");


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
        console.log(req.body);
        const { studentId, firstName, lastName, email, year, password } = req.body;
        let { programmeId } = req.body;

        programmeId = parseInt(programmeId, 10);

        // check if student exists since duplicate usernames aren't allowed
        const student = await Student.findOne({ where: { "studentId": studentId } });
        if (student) {
            return res.status(401).send("Student Account Already Exist!");
        }
        else {
            const saltRounds = 10;      // saltRounds are needed to increase the degree of hashing
            const salt = await bcrypt.genSalt(saltRounds);
            const passEncrypt = await bcrypt.hash(password, salt);// passEncrypt is the encrypted version of the password entered which uses the salt created
            await Student.create({
                studentId,
                firstName,
                lastName,
                year,
                email,
                programmeId,
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



//get all courseplans(advisingSessions) for a semester
router.get("/course-plan/all/:semesterId/:page/:itemsPerPage", staffAccountVerification, async (req, res) => {
    try {
        const semesterId = req.params.semesterId;
        const page = parseInt(req.params.page) || 1;
        const itemsPerPage = parseInt(req.params.itemsPerPage) || 5;

        if (!semesterId) {
            return res.status(400).json({ message: 'Semester ID is required' });
        }


        const coursePlans = await getAllCoursePlans(semesterId);
        if (coursePlans) {
            const totalPlans = coursePlans.length;
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            const plans = Array.isArray(coursePlans)
                ? coursePlans
                : [];

            const paginatedPlans = plans.slice(start, end);

            const payload = {
                allPlan: coursePlans,
                plans: paginatedPlans,
                totalPlans,
                totalPages: Math.ceil(totalPlans / itemsPerPage),
                currentPage: page,
            };

            res.status(200).json(payload)
        } else {
            res.status(404).send("Course Plans for Semester Not Found");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }

});

//get courseplan(advisingSession) of a student for a semester 
router.get("/course-plan/:semesterId/:studentId", staffAccountVerification, async (req, res) => {
    const coursePlan = await getStudentCoursePlan(req.params.studentId, req.params.semesterId);
    if (coursePlan) {
        console.log(coursePlan);
        res.status(200).json(coursePlan);
    } else {
        res.status(404).send("Course Plan for Student Not Found");
    }
});

// post/update courseplan(advisingSession) of a student for a semester Confirm or Return
router.put("/course-plan/review/:semesterId/:studentId/:decision", async (req, res) => {
    const decision = req.params.decision;
    console.log(decision);
    const plan = await updatePlanStatus(req.params.studentId, req.params.semesterId, decision);
    if (decision === 'Confirmed' && plan) {
        console.log("Approved");
        res.status(200).send({

            message: "Course Plan Approved",
            student: req.params.studentId
        });
    } else if (decision === 'Rejected' && plan) {
        console.log("Rejected");
        res.status(200).send({
            message: "Course Plan Not Approved",
            student: req.params.studentId
        });
    } else {
        res.status(400)
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


router.get("/detailed-course-plan/all", staffAccountVerification, async (req, res) => {
    try {
        const semesters = await Semester.findAll();
        const students = await Student.findAll();
        const coursePlans = {};

        for (const semester of semesters) {
            const semesterId = semester.id; // Assuming semester has an id property
            coursePlans[semesterId] = [];

            for (const student of students) {
                let studentId = student.studentId;
                let coursePlan = await getStudentCoursePlan(studentId, semesterId);

                if (coursePlan) {
                    coursePlans[semesterId].push(coursePlan);
                }


            }
        }

        res.status(200).json(coursePlans);
    } catch (error) {
        console.error("Error fetching course plans:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//#region 

// parserCSV
const { parseCSVData } = require('../utilities/csvParser');
const multer = require('multer');
const { or } = require("sequelize");
const SelectedCourse = require("../models/SelectedCourse");

const upload = multer({ storage: multer.memoryStorage() })

// parse programme csv
router.post('/parse/programmeCourse', upload.single('file'), async (req, res) => {

    const csvData = req.file.buffer.toString('utf8');
    const results = await parseCSVData(csvData);
    //console.log("data found", results);


    // Create Programme Entries 
    for (let i = 0; i < results[0].data.length; i++) {

        //console.log("item number:: ", i);
        const programme = await Programme.findOne({
            where: {
                id: results[0].data[i],
                name: results[1].data[i]
            }
        });
        // console.log("programme::> ", programme);
        // console.log(" prog Id: ", results[0].data[i]);
        // console.log(" name: ", results[1].data[i]);

        if (programme === null) {
            console.log("new programme: ", results[1].data[i]);

            await Programme.create({
                id: results[0].data[i],
                name: results[1].data[i],
                faculty: results[2].data[i],
                department: results[3].data[i],
            })
                .then(() => {
                    // console.log(" Programmes Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

    }

    // Create Course Entries
    for (let i = 0; i < results[4].data.length; i++) {
        const course = await Course.findOne({
            where: {
                courseCode: results[4].data[i],
            }
        });

        // console.log("courseCode: ", results[4].data[i] );
        // console.log("courseTitle: ", results[5].data[i] );
        // console.log("level: ", results[6].data[i] );
        // console.log("semester: ", results[7].data[i] );
        // console.log("credits: ", results[8].data[i] );
        // console.log("description: ", results[9].data[i] );

        if (!course) {
            await Course.create({
                courseCode: results[4].data[i],
                courseTitle: results[5].data[i],
                level: results[6].data[i],
                semester: results[7].data[i],
                credits: results[8].data[i],
                description: results[9].data[i],
            })
                .then(() => {
                    // console.log("Courses Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

    }


    // Create ProgrammeCourse Entries
    let count = 0;
    for (let i = 0; i < results[4].data.length; i++) {

        for (let j = 0; j < results[0].data.length; j++) {

            const programmeCourse = await ProgrammeCourse.findOne({
                where: {
                    courseCode: results[4].data[i],
                    programmeId: results[0].data[j],
                }
            });

            if (!programmeCourse) {
                await ProgrammeCourse.create({
                    courseCode: results[4].data[i],
                    programmeId: results[0].data[j],
                    typeId: results[12].data[count],
                })
                    .then(() => {
                        // console.log("Programme Courses Created!");
                    })
                    .catch(err => {
                        console.log("Error: ", err.message);
                    });
            }

            count++;

        }

    }


    // Create Prerequisite and Antirequisite Entries
    for (let i = 0; i < results[4].data.length; i++) {

        const prereqCourseCodes = results[10].data[i].split(',');
        const antireqCourseCodes = results[11].data[i].split(',');

        for (let j = 0; j < prereqCourseCodes.length; j++) {

            const prerequisite = await Prerequisite.findOne({
                where: {
                    courseCode: results[4].data[i],
                    prerequisiteCourseCode: prereqCourseCodes[j],
                }
            });

            // console.log("courseCode: ", results[4].data[i]);
            // console.log("prereq: ", prereqCourseCodes[j]);

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

        for (let j = 0; j < antireqCourseCodes.length; j++) {

            const antirequisite = await Antirequisite.findOne({
                where: {
                    courseCode: results[4].data[i],
                    antirequisiteCourseCode: antireqCourseCodes[j],
                }
            });

            // console.log("courseCode: ", results[4].data[i]);
            // console.log("prereq: ", prereqCourseCodes[j]);

            if (!antirequisite) {
                await Antirequisite.create({
                    courseCode: results[4].data[i],
                    antirequisiteCourseCode: antireqCourseCodes[j]
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


    return res.status(200).send("CSV parsed, programmes, courses, preqequisites, antirequisites and programmeCourses added!");

});

//#endregion





// ====================--PARSE XLSX--====================

const express = require("express");
const { parse_xlsx } = require("../utilities/xlsx_parser.js");
// const { updatePlanStatus } = require("../controllers/updateCoursePlan.js");

//parse programmecourse XLSX
router.post('/parse/programmeCourseXLSX', upload.single('file'), async (req, res) => {

    try {
        const xlsxData = req.file.buffer; // XLSX file buffer
        const [sheetdata1, sheetdata2] = parse_xlsx(xlsxData);

        const { courses, programmes, programmeCourses, groups, prerequisites, antirequisites } = sheetdata1;
        const { types, electiveRequirements } = sheetdata2;

        // ==========--------put courses in database
        /**/
        for (let i = 0; i < courses.length; i++) {
            // console.log("courseCode::> ",courses[i].courseCode);
            try {

                // check if courses is already added
                const course = await Course.findOne({ where: { courseCode: courses[i].courseCode } });

                if (course) {
                    console.log("course exist");

                }
                else {//if course is not added
                    await Course.create({
                        courseCode: courses[i].courseCode,
                        courseTitle: courses[i].courseTitle,
                        credits: courses[i].credits,
                        level: courses[i].level,
                        semester: courses[i].semester,
                        department: courses[i].department,
                        description: courses[i].description,
                    })
                    console.log("create course");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }

        }


        // ==========--------put programmes in database
        /**/
        for (let i = 0; i < programmes.length; i++) {
            try {

                // check if programme is already added
                const programme = await Programme.findOne({ where: { id: programmes[i].programmeID } });
                // console.log("programme::> ",programme);
                if (programme) {
                    console.log("programme exist");

                }
                else {//if programme is not added
                    await Programme.create({
                        id: programmes[i].programmeId,
                        name: programmes[i].name,
                        faculty: programmes[i].faculty,
                        department: programmes[i].department,
                    })
                    console.log("programme created");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }
        }


        // ==========--------put programmeCourses in database
        /*  */
        for (let i = 0; i < programmeCourses.length; i++) {
            try {
                // check if programmeCourse is already added
                const programmeCourse = await ProgrammeCourse.findOne({ where: { programmeId: programmeCourses[i].programmeId, courseCode: programmeCourses[i].courseCode } });
                // console.log("programmeCourse::> ",programmeCourse);
                if (programmeCourse) {
                    console.log("programme course exist");

                }
                else {//if programme course is not added
                    await ProgrammeCourse.create({
                        programmeId: programmeCourses[i].programmeId,
                        courseCode: programmeCourses[i].courseCode,
                        typeId: programmeCourses[i].typeId,
                    })
                    console.log("programme course created");
                }
            } catch (err) {
                console.log("Error: ", err.message);
                res.status(500).send("Server Error");
            }
        }



        // ==========--------put coursegroups into database
        /* */
        for (let i = 0; i < groups.length; i++) {

            let group = await Group.create();

            for (let j = 0; j < groups[i].courseCode.length; j++) {
                let courseCode = groups[i].courseCode[j];
                await CourseGroup.create({
                    groupId: group.id,
                    courseCode: courseCode
                });
            }
        }


        // ==========--------put prerequisites into the database
        /**/
        // console.log("!!!!!", prerequisites);
        for (let i = 0; i < prerequisites.length; i++) {

            console.log("Prerequisite:::> ", prerequisites[i]);

            const prerequisite = await Prerequisite.findOne({ where: { courseCode: prerequisites[i].courseCode, programmeId: prerequisites[i].programmeId, groupId: prerequisites[i].groupId } })

            if (!prerequisite) {
                console.log("create prereq");
                await Prerequisite.create({
                    courseCode: prerequisites[i].courseCode,
                    groupId: prerequisites[i].groupId,
                    programmeId: prerequisites[i].programmeId,
                });
            }


        }

        // ==========--------put antirequisites into the database
        /**/
        // console.log("!!!!!", antirequisites);
        for (let i = 0; i < antirequisites.length; i++) {

            // console.log("Antirequisite:::> ", antirequisites[i]);

            const antirequisite = await Antirequisite.findOne({ where: { courseCode: antirequisites[i].courseCode, antirequisiteCourseCode: antirequisites[i].antirequisiteCourseCode } })

            if (!antirequisite) {
                // console.log("create prereq");
                await Antirequisite.create({
                    courseCode: antirequisites[i].courseCode,
                    antirequisiteCourseCode: antirequisites[i].antirequisiteCourseCode,
                });
            }


        }


        // ==========--------put types into the database
        // console.log(types);
        /**/
        for (let i = 0; i < types.length; i++) {
            const type = await Type.findOne({ where: { type: types[i].type } });
            if (!type) {
                await Type.create({
                    type: types[i].type
                });
            }
        }


        // ==========--------put electiveRequirements into the database
        // console.log(electiveRequirements);
        for (let i = 0; i < electiveRequirements.length; i++) {
            const electiveRequirement = await ElectiveRequirement.findOne({ where: { typeId: electiveRequirements[i].typeId, programmeId: electiveRequirements[i].programmeId } });
            if (!electiveRequirement) {
                await ElectiveRequirement.create({
                    typeId: electiveRequirements[i].typeId,
                    programmeId: electiveRequirements[i].programmeId,
                    amount: electiveRequirements[i].amount
                });
            }
        }



        // console.log("Prerequisites: ", prerequisites);
        // console.log("Antirequisites: ", antirequisites);

        console.log("XLSX parsed and data processed successfully.");
        return res.status(200).json({
            message: "XLSX parsed and data processed successfully.",

            sheetdata1,
            //   sheetdata2,
        });
    } catch (error) {
        console.log("Error: ", error.message);
        res.status(500).send("Server Error");
    }


});



router.get("/degreeProgress/all", staffAccountVerification, async (req, res) => {

    let studentId;
    const students = await Student.findAll();
    let studentsProgress = [];
    let gpa;

    for (let s of students) {
        studentId = s.dataValues.studentId;
        let studentName = s.dataValues.firstName + " " + s.dataValues.lastName;
        let programmeId = s.dataValues.programmeId;

        let programme = await Programme.findOne({ where: { id: programmeId } });
        let programmeName = programme.name;

        const transcript = await Transcript.findOne({ where: { studentId: studentId } });
        if (transcript) {
            gpa = transcript.dataValues.gpa
        } else {
            gpa = "unknown";
        }

        // console.log("programme Name: ", programmeName);

        // console.log("studetId: ", studentId);
        // console.log("student name: ", studentName);
        // console.log("Programme ID: ", programmeId);

        //#region 
        // get all the data for the function


        // get course codes of courses completed by student
        const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
        let studentCourseCodes = [];
        for (i = 0; i < studentCourses.length; i++) {
            studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
        }
        // console.log("student courses: ", studentCourseCodes);


        // Get programme id from student model
        const student = await Student.findOne({ where: { studentId: studentId } });
        if (student) {
            programmeId = student.dataValues.programmeId;

            // console.log("student: ", student.dataValues.programmeId);
        }

        //  get programme courses for programmeId
        const programmeCourse = await ProgrammeCourse.findAll({ where: { programmeId } });
        let programmeCourses = [];
        for (i = 0; i < programmeCourse.length; i++) {
            programmeCourses.push(programmeCourse[i].dataValues);
        }
        // console.log("programmeCourse: ", programmeCoursess);

        //  get courses
        let course = await Course.findAll();
        let courses = [];
        for (i = 0; i < course.length; i++) {
            courses.push(course[i].dataValues);
        }
        //  console.log("courses: ", courses);

        // get programmeCreditRequirements
        let pcrs = await PCR.findAll({ where: { programmeId } });
        let programmeCreditRequirements = [];
        for (i = 0; i < pcrs.length; i++) {
            programmeCreditRequirements.push(pcrs[i].dataValues);
        }
        // console.log("PCR: ", programmeCreditRequirements);

        // get types
        let type = await Type.findAll();
        let types = [];
        for (i = 0; i < type.length; i++) {
            types.push(type[i].dataValues);
        }
        // console.log("types: ", types);
        //#endregion


        let degreeProgress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types);
        // console.log(degreeProgress.totalCompletedCredits);
        let studentProgress = {
            "studentId": studentId,
            "studentName": studentName,
            "programmeName": programmeName,
            "GPA": gpa,
            "credits": degreeProgress.totalCompletedCredits,
        }

        studentsProgress.push(studentProgress);

    }

    // console.log("Degree Progrress: ", degreeProgress);
    res.json({
        "Student Progress: ": studentsProgress
    });

})

router.get("/studentsSummary", staffAccountVerification, async (req, res) => {

    let studentId;
    let summary = {};
    let year1 = 0;
    let year2 = 0;
    let year3 = 0;
    let year4 = 0;
    let graduating = 0;

    const students = await Student.findAll();

    for (let s of students) {
        if (s) {
            studentId = s.dataValues.studentId;
            let programmeId = s.dataValues.programmeId;

            //console.log("studentId: ", studentId);

            let transcript = await Transcript.findOne({ where: { studentId } });
            // console.log(transcript.admitTerm);
            if (transcript) {

                //#region 

                // get course codes of courses completed by student
                const studentCourses = await StudentCourse.findAll({ where: { studentId: studentId } });
                let studentCourseCodes = [];
                for (i = 0; i < studentCourses.length; i++) {
                    studentCourseCodes.push(studentCourses[i].dataValues.courseCode);
                }
                // console.log("student courses: ", studentCourseCodes);

                //  get programme courses for programmeId
                const programmeCourse = await ProgrammeCourse.findAll({ where: { programmeId } });
                let programmeCourses = [];
                for (i = 0; i < programmeCourse.length; i++) {
                    programmeCourses.push(programmeCourse[i].dataValues);
                }
                // console.log("programmeCourse: ", programmeCoursess);

                //  get courses
                let course = await Course.findAll();
                let courses = [];
                for (i = 0; i < course.length; i++) {
                    courses.push(course[i].dataValues);
                }
                //  console.log("courses: ", courses);

                // get programmeCreditRequirements
                let pcrs = await PCR.findAll({ where: { programmeId } });
                let programmeCreditRequirements = [];
                for (i = 0; i < pcrs.length; i++) {
                    programmeCreditRequirements.push(pcrs[i].dataValues);
                }
                // console.log("PCR: ", programmeCreditRequirements);

                // get types
                let type = await Type.findAll();
                let types = [];
                for (i = 0; i < type.length; i++) {
                    types.push(type[i].dataValues);
                }

                //#endregion

                let yearsPassed = getStudentYear(transcript);
                let progress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types);
                if (progress.remainingCredits === 0) {
                    graduating++;
                }
                // console.log("progress: ", progress);

                if (yearsPassed === 1) {
                    year1++;
                } else if (yearsPassed === 2) {
                    year2++;
                } else if (yearsPassed === 3) {
                    year3++;
                } else if (yearsPassed > 3) {
                    year4++;
                }
            }

        }


    }

    summary = {
        "graduating": graduating,
        "year1": year1,
        "year2": year2,
        "year3": year3,
        ">3years": year4,
    }

    res.json({
        "Student Summary: ": summary
    });
    // console.log("summary: ", summary);

})

router.get("/students", staffAccountVerification, async (req, res) => {
    try {
        let studentsAll = [];

        const students = await Student.findAll();
        for (i = 0; i < students.length; i++) {

            const programme = await Programme.findOne({ where: { "id": students[i].programmeId } })
            let studentData = {
                "id": students[i].id,
                "accountType": "student",
                "username": students[i].studentId,
                "firstName": students[i].firstName,
                "lastName": students[i].lastName,
                "avatar": '/assets/images/face-4.png',
                "age": 0,
                "semester_started": {
                    "year_group": students[i].year,
                    "admit_term": ""
                },
                "email": students[i].email,
                "programme": programme.name,
            }

            studentsAll.push(studentData);
        }

        res.status(200).send(studentsAll);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
})

router.get("/student/:studentId", staffAccountVerification, async (req, res) => {
    try {

        const studentId = req.params.studentId;
        const student = await Student.findOne({ where: { "studentId": studentId } });

        const programme = await Programme.findOne({ where: { "id": student.programmeId } })
        let studentData = {
            "id": student.id,
            "accountType": "student",
            "username": student.studentId,
            "firstName": student.firstName,
            "lastName": student.lastName,
            "avatar": '/assets/images/face-4.png',
            "age": 0,
            "semester_started": {
                "year_group": student.year,
                "admit_term": ""
            },
            "email": student.email,
            "programme": programme.name,
        }

        res.status(200).send(studentData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
})

router.get("/degreeProgress/:studentId", staffAccountVerification, async (req, res) => {

    // get logged in studentId
    const studentId = req.params.studentId;

    let degreeProgress = await getDegreeProgress(studentId);

    res.json(
        degreeProgress
    );

})


module.exports = router;
