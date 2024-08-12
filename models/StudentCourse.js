const { Sequelize } = require("sequelize");
const db = require("../db");
// const Course = require("./Course");


// const Student = require("./Student");
// const Semester = require("./Semester");
const StudentCourse = db.define("studentcourse", {
  grade: {
    type: Sequelize.ENUM,
    values: [
      'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F1', 'F2', 'F3'
    ],
    allowNull: true,
  },
});


module.exports = StudentCourse;
