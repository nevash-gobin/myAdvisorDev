const { Sequelize } = require("sequelize");
const db = require("../db");
// const ProgrammeCourse = require("./ProgrammeCourse");
// const Course = require("./Course");


const Programme = db.define("programme", {
    name: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    faculty: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    department: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    version: {
        allowNull: false,
        type: Sequelize.STRING,
    }
});

// Programme.belongsToMany(Course, { through: ProgrammeCourse });

//circular dependency?

module.exports = Programme;
