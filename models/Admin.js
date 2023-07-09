const { Sequelize } = require("sequelize");
const db = require("../db");

const Admin = db.define("admin", {
    adminID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    lastName: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    },
}, { timestamps: true });

module.exports = Admin;
