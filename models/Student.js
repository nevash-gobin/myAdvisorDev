const { Sequelize } = require("sequelize");
const db = require("../db");

const Student = db.define("student", {
    studentID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    firstName: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    lasttName: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    },
}, { timestamps: true });

module.exports = Student;
