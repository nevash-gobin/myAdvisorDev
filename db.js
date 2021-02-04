// imports sequelize module
const Sequelize = require("sequelize");

// imports variable to enable the database url to be hidden
require("dotenv").config();

// connects database to server
const db = new Sequelize(
    process.env.DB_URL
);

// tests database connection on server start up
db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Error: " + err));

module.exports = db;
