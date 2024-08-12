//Development State
const { Sequelize } = require("sequelize");
const db = require("../db");
// const Programme = require("./Programme");
// const Course = require("./Course");
// const Type = require("./Type");

const ProgrammeCourse = db.define("programmeCourse", {
  // has a default primary key id
});

module.exports = ProgrammeCourse;
