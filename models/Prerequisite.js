const { Sequelize} = require("sequelize");
const db = require("../db");

const Prerequisite = db.define("prerequisite", {
  // has a default primary key id
});

  module.exports = Prerequisite;