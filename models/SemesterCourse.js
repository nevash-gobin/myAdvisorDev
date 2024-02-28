const { Sequelize } = require("sequelize");
const db = require("../db");
const Semester = require("./Semester");

const SemesterCourse = db.define("semestercourse", {
    // has default id
});
SemesterCourse.belongsTo(Semester, {
    foreignKey: 'semesterId',
    allowNull: false
});
module.exports = SemesterCourse;
