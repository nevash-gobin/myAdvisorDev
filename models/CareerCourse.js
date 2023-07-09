const { Sequelize} = require("sequelize");
const db = require("../db");

// Bridge table for programme and courses belonging to it
const CareerCourse = db.define("careercourse", {
  // has a default primary key id
});

  module.exports = CareerCourse;