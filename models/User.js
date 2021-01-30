const { Sequelize } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    username: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    }
});

module.exports = User;
