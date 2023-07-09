//const { Sequelize } = require("sequelize");
const db = require("../db");
const Student = require("./Student");

const AdvisingSession = db.define("advisingsession", {

}, {
    timestamps: true
});

module.exports = AdvisingSession;

