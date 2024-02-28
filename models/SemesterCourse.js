const { Sequelize } = require("sequelize");
const db = require("../db");

const Course = require("./Course");
const Semester = require("./Semester");


const SemesterCourse = db.define("semestercourse", {
    // has default id
});

Course.hasMany(SemesterCourse, {
    foreignKey: 'courseCode',
    allowNull: false
});
SemesterCourse.belongsTo(Course, {
    foreignKey: 'courseCode',
    allowNull: false
});
 

SemesterCourse.belongsTo(Semester, {
    foreignKey: 'semesterId',
    allowNull: false
});

module.exports = SemesterCourse;
