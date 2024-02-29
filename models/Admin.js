const { Sequelize } = require("sequelize");
const db = require("../db");

const Admin = db.define("admin", {
    adminID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
}, { timestamps: true });

module.exports = Admin;



// "00000"	"John"	"Doe"		"john.doe@my.uwi.edu"	"$2b$10$RyZZTC2/WBzLkwbtVG9ss.ON3oYXGYl9yKWVYUTOa0/BriYjr4l9m"	"2023-07-14 02:30:16.043+00"
// "811002795"	"Nicholas"	"Nicholas"		"nicholas.mendez@my.uwi.edu"	"$2b$10$9sm6xaghcrkHbowVsPHAcOQ5v6lPPERno.S0t/cjyi2qTvTsHwOMS"	"2023-08-07 13:29:07.958+00"
// "816021684"	"Shalana"	"Seuraj"		"shalana.seuraj@my.uwi.edu"	"$2b$10$mSg8GuvEDDwAoT7xQ/9VIOiC9Bm5YKd5t243R0/n8lR1LQ4WGkuWW"	"2023-07-14 02:16:49.753+00"
// "816026602"	"Jonathon"	"Wingson"		"jonathon.wingson@my.uwi.edu"	"$2b$10$wVhZxWKS2c4iipkrtH8QBu3H9eyH.l6fMqPBVw25SJbJKsHTc7IZC"	"2023-07-12 17:09:53.933+00"