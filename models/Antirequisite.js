const { Sequelize} = require("sequelize");
const db = require("../db");

const Antirequisite = db.define("antirequisite", {
  // has a default primary key id
});

  module.exports = Antirequisite;