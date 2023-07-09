const { Sequelize } = require("sequelize");
const db = require("../db");

const Type = db.define("type", {
  type: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Type;
