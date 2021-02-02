const { Sequelize } = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
    username: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    }
});

module.exports = Student;
