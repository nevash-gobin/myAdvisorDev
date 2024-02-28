const { Sequelize } = require("sequelize");
const db = require("../db");
const Course = require("./Course");

const ProgrammeCourse = db.define("programmeCourse", {
  // has a default primary key id
});

// A Course has many Programme Courses
Course.hasMany(ProgrammeCourse, {
  foreignKey: 'courseCode',
  allowNull: false
});
// A Programme Course belongs to one Course
ProgrammeCourse.belongsTo(Course, {
  foreignKey: 'courseCode',
  allowNull: false
});

module.exports = ProgrammeCourse;
