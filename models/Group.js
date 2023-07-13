const { Sequelize} = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
  // has a default primary key id
});

  module.exports = Group;