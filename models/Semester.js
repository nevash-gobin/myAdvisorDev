const { Sequelize} = require("sequelize");
const db = require("../db");

const Semester = db.define("semester", {
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    num: {
        type: Sequelize.ENUM('I', 'II', 'III'),
        allowNull: false,
    },
    academicYear: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Semester;
