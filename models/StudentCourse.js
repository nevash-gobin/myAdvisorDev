const { Sequelize } = require("sequelize");
const db = require("../db");

const StudentCourse = db.define("studentcourse", {
    grade: {
      type: Sequelize.ENUM('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F1', 'F2', 'F3'),
        allowNull: false,
      },
});

module.exports = StudentCourse;
