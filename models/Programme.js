const { Sequelize } = require("sequelize");
const db = require("../db");

const AwaredDegree = require("./awardedDegree");

const Programme = db.define("programme", {
  name: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  faculty: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  department: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

// A programme can have multiple awardedDegrees
Programme.hasMany(AwaredDegree, {
  foreignKey: 'programmeID',
  allowNull: false,
});

module.exports = Programme;
