const { Sequelize} = require("sequelize");
const db = require("../db");
const Course = require("./Course");

const CourseGroup = db.define("courseGroup", {
  // has a default primary key id
});

// a course has many courseGroup
Course.hasMany(CourseGroup, {
  foreignKey: 'courseCode',
  allowNull: false
});
// a coursegroup belongs to course
CourseGroup.belongsTo(Course, {
  foreignKey: 'courseCode',
  allowNull: false
});
  module.exports = CourseGroup;