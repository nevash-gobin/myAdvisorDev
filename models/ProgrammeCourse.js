const { Sequelize } = require("sequelize");
const db = require("../db");
const Course = require("./Course");

const ProgrammeCourse = db.define("programmeCourse", {
  // has a default primary key id
});

// A Course has many Programme Courses
Course.hasMany(ProgrammeCourse, {
  foreignKey: 'courseCode',
  allowNull: false
});
// A Programme Course belongs to one Course
ProgrammeCourse.belongsTo(Course, {
  foreignKey: 'courseCode',
  allowNull: false
});

ProgrammeCourse.belongsTo(Programme, {
  foreignKey: 'programmeId',
  allowNull: false
});
ProgrammeCourse.belongsTo(Type, {
  foreignKey: 'typeId',
  allowNull: false
});
// ProgrammeCourse.belongsTo(Type, { foreignKey: 'typeId' });


module.exports = ProgrammeCourse;
