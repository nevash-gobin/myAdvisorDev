const { Sequelize} = require("sequelize");
const db = require("../db");
const Programme = require("./Programme");
const Prerequisite = db.define("prerequisite", {
  // has a default primary key id
});
Prerequisite.belongsTo(Programme, {
  foreignKey: 'programmeId',
  allowNull: false
});
  module.exports = Prerequisite;