const { Sequelize} = require("sequelize");
const db = require("../db");
const Course = require("./Course");
const Group = require("./Group");

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

// A Group has many CourseGroup
Group.hasMany(CourseGroup, {
  foreignKey: {
      name: 'groupId',
  },
  allowNull: false
});
// An CourseGroup belongs to one Group
CourseGroup.belongsTo(Group, {
  foreignKey: {
      name: 'groupId',
  },
  allowNull: false
});

  module.exports = CourseGroup;