const { Sequelize } = require("sequelize");
const db = require("../db");

const ElectiveRequirement = require("./electiveRequirement");

const Type = db.define("type", {
  type: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

// A type can be in multiple Elective Requirements
Type.hasMany(ElectiveRequirement, {
  foreignKey: 'typeId',
  allowNull: false,
});

module.exports = Type;
