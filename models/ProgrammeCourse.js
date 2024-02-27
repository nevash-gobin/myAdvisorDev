const { Sequelize } = require("sequelize");
const db = require("../db");
const Programme = require("./Programme");
const Course = require("./Course");
const Type = require("./Type");

const ProgrammeCourse = db.define('ProgrammeCourse', {
  // programmeId: {
  //   type: Sequelize.STRING,
  //   references: {
  //     model: Programme,
  //     key: 'name'
  //   }
  // },
  // courseCode: {
  //   type: Sequelize.STRING,
  //   references: {
  //     model: Course,
  //     key: 'code'
  //   }
  // },
  // typeId: {
  //   type: Sequelize.STRING,
  //   references: {
  //     model: Type,
  //     key: 'type'
  //   }
  // }
  // You can add other fields here
});

// ProgrammeCourse.belongsTo(Type, { foreignKey: 'typeId' });

module.exports = ProgrammeCourse;
