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
        type: Sequelize.INTEGER,
    },
    type: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    prerequisites: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    antiRequisites: {
        allowNull: true,
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
    individualProjectPres: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    groupProjectPres: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    performanceReports: {
        allowNull: true,
        type: Sequelize.STRING,
    }
});

module.exports = Course;
