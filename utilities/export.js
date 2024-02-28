const db = require("../db");
const fs = require('fs');


const Type = require("../models/Type");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");

async function exportCoursesToJson() {
    try {
        // Fetch all courses from the database
        const courses = await Course.findAll();

        // Convert the courses to JSON format
        const coursesJson = courses.map(course => ({
            code: course.code,
            title: course.title,
            level: course.level,
            semester: course.semester,
            credits: course.credits,
            faculty: course.faculty,
            department: course.department,
            description: course.description,
            prerequisites: course.prerequisites,
            antirequisites: course.antirequisites,
        }));

        // Write the JSON data to a file
        const jsonFilePath = 'exported_courses.json';
        fs.writeFileSync(jsonFilePath, JSON.stringify(coursesJson, null, 2));

        console.log(`Courses exported to ${jsonFilePath}`);
    } catch (error) {
        console.error('Error exporting courses: ', error);
    }
}

async function exportTypesToJson() {
    try {
        const types = await Type.findAll();
        const typesJson = types.map(type => ({
            type: type.type,
            description: type.description,
        }));

        const jsonFilePath = 'exported_types.json';
        fs.writeFileSync(jsonFilePath, JSON.stringify(typesJson, null, 2));
        console.log('Types exported to types.json.');
    } catch (error) {
        console.error('Error exporting types to JSON:', error);
    }
}

async function exportProgrammesToJson() {
}

(async () => {
    await exportCoursesToJson();
    await exportTypesToJson();
})()

