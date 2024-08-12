const { addStudentTranscript } = require('./addStudentTranscript');
// const { addStudentCourses } = require('../controllers/addStudentTranscript');
const db = require('../db');
const { Op } = require('sequelize');
const Semester = require("../models/Semester");
const StudentCourse = require("../models/StudentCourse");
async function addStudentTranscriptCourses(transcriptData) {
    const start = performance.now();
    if (!await addStudentTranscript(transcriptData)) {
        return { status: 400, msg: "Student Transcript Already Added" };
    } else {
        const { studentId, studentCourses: studentcourselist } = transcriptData;
        const invalid_grades = ["IP"];

        const MAX_RETRIES = 3;

        for (const course of studentcourselist) {
            const code = Object.keys(course)[0];
            const grade = course[code].grade;
            const year = course[code].year;
            const current_year = new Date().getFullYear();
            const course_sem = course[code].semester;

            // Validate grade and year
            const grade_valid = !invalid_grades.includes(grade);
            if (!grade_valid || !year.split("/").every(yr => yr <= current_year)) {
                continue;
            }

            let retries = 0;

            while (retries < MAX_RETRIES) {
                try {
                    await db.transaction(async (t) => {
                        const student_course_exists = await StudentCourse.findOne({
                            where: {
                                [Op.and]: [
                                    { studentId: studentId },
                                    { courseCode: code }
                                ]
                            },
                            transaction: t // Ensure this query is part of the transaction
                        });

                        if (!student_course_exists) {
                            const semester = await Semester.findOne({
                                where: {
                                    [Op.and]: [
                                        { num: course_sem },
                                        { academicYear: year }
                                    ]
                                },
                                attributes: ['id'],
                                transaction: t // Ensure this query is part of the transaction
                            });

                            const sem_id = semester ? semester.get('id') : 1; // Use the actual semester id or default to 1

                            await StudentCourse.create({
                                studentId,
                                courseCode: code,
                                semesterId: sem_id,
                                grade: grade
                            }, { transaction: t });

                            console.log(`Course ${code} added as studentCourse for student ${studentId}`);
                        }
                    });
                    break; // Exit the retry loop on success
                } catch (error) {
                    if (error.message === 'SQLITE_BUSY: database is locked') {
                        console.warn(`Database is locked. Retrying (${retries + 1}/${MAX_RETRIES})...`);
                        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
                        retries++;
                    } else {
                        // Other errors
                        console.error("Error in Adding student Courses from transcript file:", error.message);
                        return { status: 500, msg: "Error in Adding student Courses from transcript file:" };
                    }
                }
            }

            if (retries === MAX_RETRIES) {
                return { status: 500, msg: "Failed to add student courses after multiple attempts" };
            }
        }

        const end = performance.now(); // Stop measuring time
        const executionTime = end - start; // Calculate execution time in milliseconds

        console.log(`Execution time: ${executionTime} milliseconds`);
        return { status: 201, msg: "Student Transcript Parsed and Courses Added" };
    }
}

module.exports = { addStudentTranscriptCourses }