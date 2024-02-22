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
    enrollment: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    l1Core: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    l2Core: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    l3Core: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    ciElective: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    cimElective: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    adElective: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    foun: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
});

module.exports = Programme;
