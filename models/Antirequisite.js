const { Sequelize} = require("sequelize");
const db = require("../db");
const Course = require("./Course");

const Antirequisite = db.define("antirequisite", {
  // has a default primary key id
});

Course.hasMany(Antirequisite, {
  foreignKey: 'courseCode',
  allowNull: false
});
// An Anit-Requisite belongs to one Course
Antirequisite.belongsTo(Course, {
  foreignKey: 'courseCode',
  allowNull: false
});

// A Course has many Anti-Requisites
Course.hasMany(Antirequisite, {
  foreignKey: 'antirequisiteCourseCode',
  allowNull: false
});
// An Anit-Requisite belongs to one Course
Antirequisite.belongsTo(Course, {
  foreignKey: 'antirequisiteCourseCode',
  allowNull: false
});

  module.exports = Antirequisite;