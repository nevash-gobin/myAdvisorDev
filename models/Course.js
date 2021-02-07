const { Sequelize } = require("sequelize");
const db = require("../db");

// NOTE: Course model may require more fields
const Course = db.define("course", {
    courseCode: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    courseTitle: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    credits: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    level: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    semester: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    description: {
        allowNull: false,
        type: Sequelize.STRING
    }
});

module.exports = Course;
