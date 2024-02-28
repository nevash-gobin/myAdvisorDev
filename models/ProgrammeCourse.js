const { Sequelize } = require("sequelize");
const db = require("../db");
const Programme = require("./Programme");
const Course = require("./Course");
const Type = require("./Type");

const ProgrammeCourse = db.define('ProgrammeCourse', {
  programmeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Programme,
      key: 'id'
    }
  },
  courseId: {
    type: Sequelize.INTEGER,
    references: {
      model: Course,
      key: 'id'
    }
  },
  typeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Type,
      key: 'id'
    }
  }
  // You can add other fields here
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
