//const { Sequelize } = require("sequelize");
const db = require("../db");

const AdvisingSession = db.define("advisingsession", {

}, {
    timestamps: true
});

module.exports = AdvisingSession;
