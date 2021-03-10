const { Sequelize } = require("sequelize");
const db = require("../db");

const AdvisingWindow = db.define("advisingwindow", {
    advisingStart: {
        allowNull: false,
        type: Sequelize.DATEONLY,
    },
    advisingEnd: {
        allowNull: false,
        type: Sequelize.DATEONLY
    },
    semester: {
        allowNull: false,
        type: Sequelize.INTEGER
    }
});

module.exports = AdvisingWindow;
