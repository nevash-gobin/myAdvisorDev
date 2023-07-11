const { Sequelize} = require("sequelize");
const db = require("../db");

const CourseGroup = db.define("courseGroup", {
  // has a default primary key id
});

  module.exports = CourseGroup;