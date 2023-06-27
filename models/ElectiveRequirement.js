const { Sequelize } = require("sequelize");
const db = require("../db");
const Programme = require("./programme");
const Type = require("./type");

const ElectiveRequirement = db.define("electiveRequirement", {
  amount: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

// An Elective Requirement belongs to one Programme
ElectiveRequirement.belongsTo(Programme, {
  foreignKey: 'programmeID',
  allowNull: false,
});

// An Elective Requirement has one  Type
ElectiveRequirement.hasOne(Type, {
  foreignKey: 'typeId',
  allowNull: false,
});

module.exports = ElectiveRequirement;
