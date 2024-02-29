const { Sequelize } = require("sequelize");
const db = require("../db");
// const Course = require("./Course");

const SelectedCourse = db.define("SelectedCourse", {
  // has a default primary key id
});

// // A Course has many Advised Courses
// Course.hasMany(SelectedCourse, {
//   foreignKey: 'courseCode',
//   allowNull: false
// });

// // An Advised Course belongs to one Course
// SelectedCourse.belongsTo(Course, {
//   foreignKey: 'courseCode',
//   allowNull: false
// });

module.exports = SelectedCourse;
