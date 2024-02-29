const { Sequelize } = require("sequelize");
const db = require("../db");

const Faculty = db.define('Faculty', {
    name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    code: {
        allowNull: false,
        type: Sequelize.STRING,
    },
});

module.exports = Faculty;
//slight change