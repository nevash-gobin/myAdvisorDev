
const { Sequelize } = require("sequelize");
const db = require("../db");

// NOTE: Course model may require more fields
const Course = db.define("course", {
    courseCode: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    courseTitle: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    credits: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    level: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    semester: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    type: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    prerequisites: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    coursework: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    finalExam: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    groupProject: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    individualWork: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    practicalCoursework: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    courseworkExam: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    projectPres: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    project: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    presentation: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    assignment: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    labAssessment: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    midSemesterMcq: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    projectReport: {
        allowNull: true,
        type: Sequelize.STRING,
    }
    
});

module.exports = Course;
