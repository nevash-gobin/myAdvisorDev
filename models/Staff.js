const { Sequelize} = require("sequelize");
const db = require("../db");

const Staff = db.define("staff", {
    staffID: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING,
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING,
    },
}, { timestamps: true });

module.exports = Staff;
