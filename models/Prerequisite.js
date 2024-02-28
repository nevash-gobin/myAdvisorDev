const { Sequelize} = require("sequelize");
const db = require("../db");

const Programme = require("./Programme");
const Course = require("./Course");
const Group = require("./Group");

const Prerequisite = db.define("prerequisite", {
  // has a default primary key id
});

// A Course has many Prerequisites
Course.hasMany(Prerequisite, {
  foreignKey: {
      name: 'courseCode',
      type: Sequelize.STRING
  },
  allowNull: false
});
// An Prerequisite belongs to one Course
Prerequisite.belongsTo(Course, {
  foreignKey: {
      name: 'courseCode',
      type: Sequelize.STRING
  },
  allowNull: false
});

Group.hasMany(Prerequisite, {
  foreignKey: {
      name: 'groupId',
  },
  allowNull: false
});
// An Prerequisite belongs to one Group
Prerequisite.belongsTo(Group, {
  foreignKey: {
      name: 'groupId',
  },


Prerequisite.belongsTo(Programme, {
  foreignKey: 'programmeId',
  allowNull: false
});
  module.exports = Prerequisite;