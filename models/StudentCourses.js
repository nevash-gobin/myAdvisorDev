const { Sequelize } = require("sequelize");
const db = require("../db");

const StudentCourses = db.define("studentcourses", {
    studentId: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    courseCode: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    courseTitle: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    grade: {
        allowNull: false,
        type: Sequelize.STRING,
    }
});

module.exports = StudentCourses;
