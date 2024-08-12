const db = require("../db");
const fs = require('fs');


const Type = require("../models/Type");
const Programme = require("../models/Programme");
const Course = require("../models/Course");
const ProgrammeCourse = require("../models/ProgrammeCourse");
const ElectiveRequirement = require("../models/ElectiveRequirement");

require("../models/Associations");

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
    try {
        const programmes = await Programme.findAll();  // Assuming Programme is your Sequelize model for programmes
        const programmesJSON = [];

        for (const programme of programmes) {
            const programmeCourses = await ProgrammeCourse.findAll({
                where: { programmeID: programme.id }
            });

            const courses = {};
            for (const course of programmeCourses) {
                const type = await Type.findOne({ where: { id: course.typeId } });

                if (type) {
                    courses[course.courseCode] = type.type;
                }
            }

            const electiveRequirements = await ElectiveRequirement.findAll({
                where: { programmeID: programme.id }
            });

            const requirements = {};
            for (const requirement of electiveRequirements) {
                const type = await Type.findOne({ where: { id: requirement.typeId } });

                if (type) {
                    requirements[type.type] = requirement.amount;
                }
            }

            console.log(requirements);

            const programmeData = {
                name: programme.name,
                courses: courses,
                faculty: programme.faculty,
                department: programme.department,
                requirements: requirements,
                version: programme.version,
            };

            programmesJSON.push(programmeData);
        }

        const jsonFilePath = 'exported_programmes.json';
        fs.writeFileSync(jsonFilePath, JSON.stringify(programmesJSON, null, 2));
        console.log('Programmes and Courses exported to exported_programmes.json.');
    } catch (error) {
        console.error('Error exporting programmes to JSON:', error);
    }
}

(async () => {
    await exportCoursesToJson();
    await exportTypesToJson();
    await exportProgrammesToJson();
})()

