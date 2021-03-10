const { Sequelize } = require("sequelize");
const db = require("../db");

const Staff = db.define("staff", {
    username: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    }
});

module.exports = Staff;
