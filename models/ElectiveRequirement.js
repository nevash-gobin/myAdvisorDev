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

ElectiveRequirement.belongsTo(Programme, {
  foreignKey: 'programmeID',
  allowNull: false,
});

ElectiveRequirement.belongsTo(Type, {
  foreignKey: 'typeId',
  allowNull: false,
});

module.exports = ElectiveRequirement;
