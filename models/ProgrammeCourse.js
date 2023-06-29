const { Sequelize } = require("sequelize");
const db = require("../db");

const ProgrammeCourse = db.define("programmeCourse", {
  // has a default primary key id
});

module.exports = ProgrammeCourse;
