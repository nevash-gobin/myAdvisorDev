const { Sequelize } = require("sequelize");
const db = require("../db");

const AwaredDegree = db.define("awardedDegree", {
  // id: {
  //     allowNull: false,
  //     primaryKey: true,
  //     type: Sequelize.INTEGER,
  // },
  dateawarded: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

module.exports = AwaredDegree;
