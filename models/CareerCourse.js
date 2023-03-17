
const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

// Bridge table for programme and courses belonging to it
const CareerCourse = db.define("careercourse", {
    careerID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    courseID: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
  });

  module.exports = CareerCourse;