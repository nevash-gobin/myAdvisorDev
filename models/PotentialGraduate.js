const { Sequelize } = require("sequelize");
const db = require("../db");

const PotentialGraduate = db.define("potentialgraduate", {
    studentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    degree: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    major: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    gpa: {
        allowNull: false,
        type: Sequelize.DECIMAL(5, 2),
    },
    admitTerm: {
        allowNull: false,
        type: Sequelize.STRING,
    }
}, {timestamps: true});

module.exports = PotentialGraduate;