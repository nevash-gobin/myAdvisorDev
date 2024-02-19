const { Sequelize } = require("sequelize");
const db = require("../db");

const SelectedCourse = db.define("SelectedCourse", {
  // has a default primary key id
});

module.exports = SelectedCourse;
