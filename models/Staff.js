const { Sequelize } = require("sequelize");
const db = require("../db");


//const { sequelize } = require('../db');
//const { DataTypes } = require('sequelize');

    const Staff = db.define("staff", {
        username: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    }, {timestamps: true});

module.exports = Staff;

