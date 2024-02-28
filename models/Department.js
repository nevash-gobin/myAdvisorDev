const { Sequelize } = require("sequelize");
const db = require("../db");

const Department = db.define('Department', {
    name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    code: {
        allowNull: false,
        type: Sequelize.STRING,
    },
});

module.exports = Department;
