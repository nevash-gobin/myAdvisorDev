const { Sequelize } = require("sequelize");
const db = require("../db");

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

module.exports = Programme;
