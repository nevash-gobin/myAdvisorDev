const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const AdvisingWindow = db.define("advisingwindow", {
    advisingStart: {
        allowNull: false,
        type: Sequelize.DATEONLY,
    },
    advisingEnd: {
        allowNull: false,
        type: Sequelize.DATEONLY,
    },
    semester: {
        allowNull: false,
        type: DataTypes.ENUM("semester 1", "semester 2", "semester 3"),
    },
}, { timestamps: true });

module.exports = AdvisingWindow;
