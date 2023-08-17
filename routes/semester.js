const router = require("express").Router();

// import models
const Semester = require("../models/Semester");
const SemesterCourse = require("../models/semesterCourse");
const AdvisingSession = require("../models/AdvisingSession");
const AdvisedCourse = require("../models/AdvisedCourse");
const Course = require("../models/Course");

const { Op } = require("sequelize");

// Create a Semester
router.post("/add", async (req, res) => {
    try {
        // destructure data entered
        const { startDate, endDate, num, academicYear, courses } = req.body;

        // check if semester is already added
        let semester = await Semester.findOne({ where: { num, academicYear } });
        if (semester) {
            return res.status(401).send("Semester already exists.");
        }
        else {
            await Semester.create({
                startDate,
                endDate,
                num,
                academicYear
            })
                .then(() => {
                    return res.status(200).send("Semester added!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

        semester = await Semester.findOne({ where: { num, academicYear } });
        for (let i = 0; i < courses.length; i++) {
            const semesterCourse = await SemesterCourse.findOne({
                where: {
                    courseCode: courses[i],
                }
            })
            if (!semesterCourse) {
                await SemesterCourse.create({
                    semesterId: semester.id,
                    courseCode: courses[i]
                })
            }
        }

    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Update a Semester
router.put("/update", async (req, res) => {
    try {
        // destructure data entered
        const { startDate, endDate, num, academicYear, courses } = req.body;

        const semester = await Semester.findOne({ where: { num, academicYear } });

        if (!semester) {
            return res.status(401).send("Semester not found.");
        }
        else {
            if (startDate)
                semester.startDate = startDate;
            if (endDate)
                semester.endDate = endDate;
            if (num)
                semester.num = num;
            if (academicYear)
                semester.academicYear = academicYear;

            // Remove courses that are not present in the updated data
            if (courses) {
                const existingCourses = await SemesterCourse.findAll({
                    where: {
                        semesterId: semester.id,
                        courseCode: { [Op.notIn]: courses }
                    }
                });
                await Promise.all(existingCourses.map(course => course.destroy()));
            }

            if (courses) {
                for (let i = 0; i < courses.length; i++) {
                    const semesterCourse = await SemesterCourse.findOne({
                        where: {
                            semesterId: semester.id,
                            courseCode: courses[i],
                        }
                    })
                    if (!semesterCourse) {
                        await SemesterCourse.create({
                            semesterId: semester.id,
                            courseCode: courses[i]
                        })
                    }
                }
            }

            await semester.save(); // Save the changes

            res.status(200).send("Semester updated successfully.");

        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Get all Semesters
router.get("/all", async (req, res) => {
    try {
        const semesters = await Semester.findAll();
        res.status(200).json(semesters);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

//Get Semester by Id
router.get("/:semesterId", async (req, res) => {
    try {
        const semester = await Semester.findOne({ where: { id: req.params.semesterId } });
        res.status(200).json(semester);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Get Courses for a Semester 
router.get("/courses/:semesterId", async (req, res) => {
    try {
        const semesterCourses = await SemesterCourse.findAll({ where: { semesterId: req.params.semesterId } });
        let semCourses = [];

        if (!semesterCourses) {

        }
        else {
            var i;
            let courseCodes = [];

            for (i = 0; i < semesterCourses.length; i++) {
                courseCodes.push(semesterCourses[i].dataValues.courseCode)
            }

            for (i = 0; i < courseCodes.length; i++) {
                const course = await Course.findOne({ where: { courseCode: courseCodes[i] } });
                semCourses.push(course);
            }
        }
        res.status(202).json(semCourses);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

const studentAccountVerification = require("../middleware/studentAccountVerification");

// router.post("/plan", studentAccountVerification, async (req, res) => {
//     try {
//         const { semesterId, courses } = req.body;
//         const semester = await Semester.findOne({ where: { id: semesterId } });

//         if (semester) {
//             const studentId = req.user;

//             const advisingSession = await AdvisingSession.findOne({
//                 where: {
//                     studentId: studentId,
//                     semesterId: semesterId,
//                 },
//             });

//             if (!advisingSession) {
//                 await AdvisingSession.create({
//                     studentId: studentId,
//                     semesterId: semesterId,
//                 });
//             }




//             if (advisingSession) {
//                 let isError = false;

//                 for (let i = 0; i < courses.length; i++) {
//                     // console.log("course: ", courses[i]);
//                     // console.log("sessionId: ", advisingSession.dataValues.id);

//                     try {
//                         await AdvisedCourse.create({
//                             advisingSessionId: advisingSession.dataValues.id,
//                             courseCode: courses[i],
//                         });
//                     } catch (err) {
//                         console.log("Error: ", err.message);
//                         isError = true;
//                     }
//                 }

//                 if (isError) {
//                     res.status(500).send("Error occurred while adding advised courses");
//                 } else {
//                     res.status(200).send("Semester Planned!");
//                 }
//             }
//         }
//     } catch (err) {
//         console.log("Error: ", err.message);
//         res.status(500).send("Server Error");
//     }
// });


router.post("/plan", studentAccountVerification, async (req, res) => {
    const { semesterId, courses } = req.body;
    const studentId = req.user;

    try {
        // Find and delete existing advising session along with advised courses
        await AdvisingSession.destroy({
            where: {
                studentId: studentId,
                semesterId: semesterId,
            },
            cascade: true, // Delete associated advised courses
        });

        // Create a new advising session
        const newAdvisingSession = await AdvisingSession.create({
            studentId: studentId,
            semesterId: semesterId,
        });

        let isError = false;

        // Add new advised courses
        for (let i = 0; i < courses.length; i++) {
            try {
                await AdvisedCourse.create({
                    advisingSessionId: newAdvisingSession.id,
                    courseCode: courses[i],
                });
            } catch (err) {
                console.log("Error: ", err.message);
                isError = true;
            }
        }

        if (isError) {
            res.status(500).send("Error occurred while adding advised courses");
        } else {
            res.status(200).send("Semester Planned!");
        }
    } catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});


router.get("/courses/:department/:semesterId", async (req, res) => {

    let department = req.params.department;
    let semesterId = req.params.semesterId;

    let courses = await Course.findAll({ where: { department } })

    let semesterCourses = await SemesterCourse.findAll({ where: { semesterId } })

    let semesterCoursesInDepartment = semesterCourses.filter(semesterCourse => {
        // Assuming the course code is stored in the 'courseCode' field of 'semesterCourse'
        return courses.some(course => course.courseCode === semesterCourse.courseCode);
    });

    // console.log("semesterCourses in department: ", semesterCoursesInDepartment);
    res.json(semesterCoursesInDepartment);

    // console.log("courses: ", courses);

});


router.get("/flags/:semesterId", async (req, res) => {

    

});


module.exports = router;
