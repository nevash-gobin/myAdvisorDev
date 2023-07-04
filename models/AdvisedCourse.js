const { Sequelize } = require("sequelize");
const db = require("../db");

const AdvisedCourse = db.define("advisedCourse", {
  // has a default primary key id
});

module.exports = AdvisedCourse;
