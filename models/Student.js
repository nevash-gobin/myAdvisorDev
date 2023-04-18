const { Sequelize } = require("sequelize");
const db = require("../db");

// NOTE: Student model requires more fields for grades, year etc.

    const Student = db.define("student", {
        username: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
    }, {timestamps: true});
    

module.exports = Student;
