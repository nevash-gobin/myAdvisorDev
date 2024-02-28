const { Sequelize } = require("sequelize");
const db = require("../db");

const Student = require("./Student");
const Semester = require("./Semester");
const StudentCourse = db.define("studentcourse", {
    grade: {
      type: Sequelize.ENUM('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F1', 'F2', 'F3'),
        allowNull: false,
      },
});
StudentCourse.belongsTo(Student, {
  foreignKey: 'studentId',
  allowNull: false
});
StudentCourse.belongsTo(Semester, {
  foreignKey: 'semesterId',
  allowNull: false
});
module.exports = StudentCourse;
