const ProgrammeCourse = require("../models/ProgrammeCourse");
const StudentCourse = require("../models/StudentCourse");
const SemesterCourse = require("../models/SemesterCourse");
const Student = require("../models/Student");
const Course = require("../models/Course");
const ElectiveRequirement = require("../models/ElectiveRequirement");
const Type = require("../models/Type");
const { Op } = require("sequelize");
const { getEligibleCourses } = require("../controllers/getEligibleCourses");
const { getDegreeProgress } = require("../controllers/getDegreeProgress");
const { getPlannedCourses } = require("../controllers/getPlannedCourses");

async function getCoursePlan(studentId, semesterId) {
    try {
        const programme_id = await Student.findOne({
            attributes: ['programmeId'],
            where: {
                studentId: studentId
            }
        }).then(async (programme) => {
            return programme.get('programmeId');
        });
        let eligiblecoursesObj = [];
        let coursePlan = [];

        //where selected courses can pull from
        const courses_eligible = await getEligibleCourses(studentId, semesterId);
        const degree_progress = await getDegreeProgress(studentId);//use to determine effect of selected courses
        
        const planned_courses = await getPlannedCourses(studentId, semesterId);//what is displayed on the courseplan

        if (courses_eligible) {
            // get eligibleCourses
            for (let course_c of courses_eligible) {
                const typeName = await Type.findOne({
                    attributes: ['type'],
                    where: {
                        id: await ProgrammeCourse.findOne({
                            attributes: ['typeId'],
                            where: {
                                [Op.and]: [
                                    { courseCode: course_c },
                                    { programmeId: programme_id }
                                ]
                            }
                        }).then(async (programme) => {
                            return programme.get('typeId');
                        })
                    }
                }).then(async (type) => {
                    return type.get('type')
                });

                const [courseName, credits] = await Course.findOne({
                    attributes: ['title', 'credits'],
                    where: {
                        code: course_c
                    }
                }).then(async (content) => {
                    return [content.get('title'), content.get('credits')]
                });
                eligiblecoursesObj.push({
                    "courseCode": course_c,
                    "courseTitle": courseName,
                    "type": typeName,
                    "selected": false,
                    "credits": credits
                })
            }
        }
        if (planned_courses) {
            for (let courseCode of planned_courses) {
                // console.log("planned: ", courseCode);
                const courseToUpdate = eligiblecoursesObj.find((course) => course['courseCode'] === courseCode);
                if (courseToUpdate) {
                    courseToUpdate.selected = true;
                    // console.log(courseToUpdate);
                }
            }


        }
        for (let type in degree_progress.requirements) {
            let planData = {};
            let plancourses = [];
            planData["creditType"] = type;
            planData["creditsRemaining"] = degree_progress.requirements[type][0];
            for (let e of eligiblecoursesObj) {
                if (e.type === type) {
                    if (e.selected) {
                        planData["creditsRemaining"] -= e.credits;
                    }
                    plancourses.push(e);
                }
            }
            planData["creditsRemaining"] = [planData.creditsRemaining, degree_progress.requirements[type][1]];
            planData["Courses"] = plancourses;
            coursePlan.push(planData);
        }
        // console.log(coursePlan);

        return coursePlan;
    } catch (error) {
        const msg = `Error in getting student's ${studentId} structured courseplan for semesterId ${semesterId}:`;
        console.log(msg, error.message);
        return null;
    }


}
// (async () => {
//     const test = await getCoursePlan('816031565', 2);
//     console.log(test);
// })()
module.exports = { getCoursePlan };