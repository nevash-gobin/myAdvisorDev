const { Sequelize} = require("sequelize");
const db = require("../db");

const AwaredDegree = require("./awardedDegree");
const Transcript = require("./transcript");

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
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    },
}, { timestamps: true });


// A student can only have one transcript (optional)
Student.hasOne(Transcript, {
    foreignKey: 'studentId',
    allowNull: false,
  });

// A student can have multiple awarded degrees (optional)
  Student.hasMany(AwaredDegree, {
    foreignKey: 'studentID',
    allowNull: false,
  });

module.exports = Student;
