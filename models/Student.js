const { Sequelize} = require("sequelize");
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
    lastName: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    career: {
        allowNull: true,
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
    programmeId: {
        allowNull: true, // Change to false if each student must have a programme
        type: Sequelize.INTEGER, // Assuming Programme's primary key is an INTEGER
    },
}, { timestamps: true });

module.exports = Student;
