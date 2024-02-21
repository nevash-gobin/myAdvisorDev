const { Sequelize } = require("sequelize");
const db = require("../db");

const Course = db.define("course", {
    courseCode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
    },
    courseTitle: {
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


    // coursework: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // finalExam: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // groupProject: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // individualWork: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // practicalCoursework: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // courseworkExam: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // projectPres: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // project: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // presentation: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // assignment: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // labAssessment: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // midSemesterMcq: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // projectReport: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // projectReportPres: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // projectAndPres: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // performanceReports: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // },
    // projectSoftwareApp: {
    //     allowNull: true,
    //     type: Sequelize.STRING,
    // }

});

module.exports = Course;
