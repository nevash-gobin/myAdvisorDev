const { Sequelize } = require("sequelize");
const db = require("../db");

const SemesterCourse = db.define("semestercourse", {
    // has default id
});

module.exports = SemesterCourse;
