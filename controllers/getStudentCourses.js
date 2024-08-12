const StudentCourses = require("../models/StudentCourse");
const Semester = require("../models/Semester");
const Course = require("../models/Course");

async function getStudentsCourses(studentId) {
    try {
        const studentCourses = await StudentCourses.findAll({
            where: {
                studentId: studentId
            }
        });

        const processedCourses = await Promise.all(studentCourses.map(async (info) => {
            const stdCourseInfo = info.dataValues;

            const [semInfo, courseInfo] = await Promise.all([
                Semester.findOne({
                    attributes: ['academicYear', 'num'],
                    where: {
                        id: stdCourseInfo.semesterId
                    }
                }),
                Course.findOne({
                    attributes: ['title', 'credits'],
                    where: {
                        code: stdCourseInfo.courseCode
                    }
                })
            ]);

            return {
                id: stdCourseInfo.id,
                courseCode: stdCourseInfo.courseCode,
                courseName: courseInfo.title,
                creditHours: courseInfo.credits,
                grade: stdCourseInfo.grade,
                semester: semInfo.num,
                academicYear: semInfo.academicYear
            };
        }));

        return processedCourses;
    } catch (error) {
        console.error("Error in getStudentsCourses:", error);
        throw error;
    }
}
module.exports = { getStudentsCourses }