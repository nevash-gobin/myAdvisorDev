const db = require("../db");

const ProgrammesJSON = require("../programmes.json");
const CoursesJSON = require("../courses.json");
const TypesJSON = require("../types.json");

const Type = require("../models/Type");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");

// models
// const Admin = require("../models/Admin");
// const AdvisedCourse = require("../models/SelectedCourse");
// const AdvisingSesssion = require("../models/AdvisingSession")
// const Antirequisite = require("../models/Antirequisite");
// const AwardedDegree = require("../models/AwardedDegree");
// const ElectiveRequirement = require("../models/ElectiveRequirement");
// const PotentialGraduate = require("../models/PotentialGraduate");
// const Prerequisite = require("../models/Prerequisite");
// const Semester = require("../models/Semester");
// const Student = require("../models/Student");
// const StudentCourse = require("../models/StudentCourse");
// const Transcript = require("../models/Transcript");s
// const Group = require("../models/Group");
// const CourseGroup = require("../models/CourseGroup");
// const SemesterCourse = require("../models/SemesterCourse");


async function createType({ type, description }) {
    return Type.create({ type, description });
}

async function createProgramme(programmeData) {
    return Programme.create(programmeData);
}

async function loadProgrammes(programmesJSON) {
    let promises = programmesJSON.map(createProgramme);
    try {
        await Promise.all(promises);
        console.log("Loaded Programmes");
    } catch (e) {
        console.error("Error loading programmes: ", e);
    }
}


async function createCourse(courseData) {
    return Course.create(courseData);
}

async function loadCourses(coursesJSON) {
    let promises = coursesJSON.map(createCourse);
    try {
        await Promise.all(promises);
        console.log("Loaded Courses");
    } catch (e) {
        console.error("Error loading courses: ", e);
    }
}

async function loadTypes(TypesJSON) {
    let promises = TypesJSON.map(createType);
    try {
        await Promise.all(promises);
        console.log('Loaded Types');
    } catch (e) {
        console.error("Error: ", e);
    }
}

async function createProgrammeCourse(programmeId, courseId, typeId) {
    return ProgrammeCourse.create({ programmeId, courseId, typeId });
}

async function loadProgrammeCourses(programmesJSON) {
    let promises = programmesJSON.map(async (programmeData) => {
        const programme = await Programme.findOne({ where: { name: programmeData.name } });
        const courseIdArray = Object.keys(programmeData.courses);

        const coursePromises = courseIdArray.map(async (courseCode) => {
            const course = await Course.findOne({ where: { code: courseCode } });
            const typeId = await Type.findOne({ where: { type: programmeData.courses[courseCode] } });
            // console.log(typeId.type);
            return createProgrammeCourse(programme.name, course.code, typeId.type);
        });

        return Promise.all(coursePromises);
    });

    try {
        await Promise.all(promises);
    } catch (e) {
        console.error("Error loading programme courses: ", e);
    }
}


(async () => {
    await db.sync({ force: true });
    await loadTypes(TypesJSON);
    await loadCourses(CoursesJSON);
    await loadProgrammes(ProgrammesJSON);
    await loadProgrammeCourses(ProgrammesJSON);
    console.log('Done');
})()