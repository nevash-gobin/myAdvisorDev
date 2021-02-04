const { Sequelize } = require("sequelize");
const db = require("../db");

// NOTE: Student model requires more fields for grades, year etc.
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
