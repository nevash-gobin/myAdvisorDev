const { Sequelize} = require("sequelize");
const db = require("../db");
// const Transcript = require("./Transcript");
// const AwardedDegree= require("./AwardedDegree");
// const Programme= require("./Programme");
// const StudentCourse= require("./StudentCourse");
const AdvisingSession= require("./AdvisingSession");

const Student = db.define("student", {
    studentId: {
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

// Student.hasOne(Transcript, {
//     foreignKey: 'studentId',
//     allowNull: false,
// });
// Student.hasMany(AwardedDegree, {
//     foreignKey: 'studentId',
//     allowNull: false
// });
// Student.belongsTo(Programme, {
//     foreignKey: 'programmeId',
//     allowNull: true, // Change to false if each student must have a programme
// });
// Student.hasMany(StudentCourse, {
//     foreignKey: 'studentId',
//     allowNull: false
// });
// Student.hasMany(AdvisingSession, {
//     foreignKey: 'studentId',
//     allowNull: false
// });
module.exports = Student;
