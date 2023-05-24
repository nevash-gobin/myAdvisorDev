// imports sequelize module
const Sequelize = require("sequelize");

// imports variable to enable the database url to be hidden
require("dotenv").config();

// connects database to server


const db = new Sequelize(
    'advisor-app-uwi', //database name
    'advisor-app-uwi', //username
    'phe3aeB5yopha7sh', //password
    {
        host: 'postgres_14',
        port: 5432,
        dialect: 'postgres',
        pool: {
            max: 3, 
            min: 0,
            idle: 10000,
        }
    });

/*
const db = new Sequelize(
    "postgres://agdbblsa:sky9sH57Uf4QAM-eP71ooyYlaM9VLJHJ@ziggy.db.elephantsql.com:5432/agdbblsa", {
    pool: {
        max: 3,
        min: 0,
        idle: 10000,
    },
});
*/



// tests database connection on server start up. To see if connection is OK.

db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Error: " + err));

module.exports = db;
 