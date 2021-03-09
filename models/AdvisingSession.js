const { Sequelize } = require("sequelize");
const db = require("../db");

const AdvisingSession = db.define("advisingsession", {
    studentID: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    sessionDate: {
        allowNull: false,
        type: Sequelize.DATEONLY
    }
});

module.exports = AdvisingSession;
