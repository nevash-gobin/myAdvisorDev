const { Sequelize } = require("sequelize");
const db = require("../db");

const StudentCourse = db.define("studentcourse", {
    grade: {
        type: DataTypes.ENUM('A', 'B', 'C', 'F'),
        allowNull: false,
      },
});

module.exports = StudentCourse;
