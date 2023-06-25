const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
    studentID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING, // Change data type to STRING
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    },
}, { timestamps: true });

module.exports = Student;
