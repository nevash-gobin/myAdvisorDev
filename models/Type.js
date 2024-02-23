const { Sequelize } = require("sequelize");
const db = require("../db");
const ProgrammeCourse = require("./ProgrammeCourse");

const Type = db.define("type", {
  type: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.STRING,
  },
  description:{
    allowNull: false,
    type: Sequelize.STRING
  }
});

Type.hasMany(ProgrammeCourse, { foreignKey: 'typeId' });

module.exports = Type;
