const { Sequelize } = require("sequelize");
const db = require("../db");

const AwaredDegree = db.define("awardedDegree", {
  dateawarded: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

module.exports = AwaredDegree;
