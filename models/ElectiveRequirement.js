const { Sequelize } = require("sequelize");
const db = require("../db");

const ElectiveRequirement = db.define("electiveRequirement", {
  amount: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
});

module.exports = ElectiveRequirement;
