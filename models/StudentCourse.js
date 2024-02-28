const { Sequelize } = require("sequelize");
const db = require("../db");
const Course = require("./Course");


const Student = require("./Student");
const Semester = require("./Semester");
const StudentCourse = db.define("studentcourse", {
    grade: {
      type: Sequelize.ENUM('A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F1', 'F2', 'F3'),
        allowNull: false,
      },
});

// A Course has many Student Course
Course.hasMany(StudentCourse, {
  foreignKey: 'courseCode',
  allowNull: false
}); 
// A Student Course belongs to one Course
StudentCourse.belongsTo(Course, {
  foreignKey: 'courseCode',
  allowNull: false
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
