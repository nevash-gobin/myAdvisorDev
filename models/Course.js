const { Sequelize } = require("sequelize");
const db = require("../db");
const ProgrammeCourse = require("./ProgrammeCourse");
const Programme = require("./Programme");

const Course = db.define("course", {
    code: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    faculty: {
        allowNull: false,
        type: Sequelize.STRING, // Adjust the data type based on your Faculty model
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
        type: Sequelize.ENUM,
        values: ['I', 'II', 'III'],
    },
    department: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    description: {
        allowNull: false,
        type: Sequelize.TEXT,//Datatype = TEXT to allow for descriptions longer than 255
    },

});

Course.belongsToMany(Programme, { through: ProgrammeCourse });

module.exports = Course;
