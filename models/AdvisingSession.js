const { Sequelize } = require("sequelize");
const db = require("../db");
const Student = require("./Student");

const AdvisingSession = db.define("advisingsession", {
    createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = AdvisingSession;

