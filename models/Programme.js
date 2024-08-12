const { Sequelize } = require("sequelize");
const db = require("../db");

// const Student = require("./Student");
// const Prerequisite = require("./Prerequisite");
// const AwardedDegree = require('./AwardedDegree');
// const ElectiveRequirement = require("./ElectiveRequirement");
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

// Programme.hasMany(Student, {
//     foreignKey: 'programmeId',
// });
// Programme.hasMany(Prerequisite, {
//     foreignKey: 'programmeId',
//     allowNull: false
// });
// Programme.hasMany(AwardedDegree, {
//     foreignKey: 'programmeId',
//     allowNull: false
// });
// Programme.hasMany(ElectiveRequirement, {
//     foreignKey: 'programmeId',
//     allowNull: false
// });
// Programme.hasMany(ProgrammeCourse, {
//     foreignKey: 'programmeId',
//     allowNull: false
// });


//circular dependency?

module.exports = Programme;
