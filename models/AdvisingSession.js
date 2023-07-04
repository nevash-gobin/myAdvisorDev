const { Sequelize} = require("sequelize");
const db = require("../db");
const Student = require("./Student");

const AdvisingSession = db.define("advisingsession", {
    sessionDate: {
        allowNull: false,
        type: Sequelize.DATEONLY,
    },
});

AdvisingSession.belongsTo(Student, {
    foreignKey: {
        allowNull: false,
    },
});

module.exports = AdvisingSession;

