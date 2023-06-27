const { Sequelize } = require("sequelize");
const db = require("../db");
const Student = require("./student");
const Programme = require("./programme");

const AwaredDegree = db.define("awardedDegree", {
  dateawarded: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

AwaredDegree.belongsTo(Student, {
  foreignKey: 'studentID',
  allowNull: false,
});

AwaredDegree.belongsTo(Programme, {
  foreignKey: 'programmeID',
  allowNull: false,
});

module.exports = AwaredDegree;
