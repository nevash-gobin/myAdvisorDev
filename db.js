// imports sequelize module
const Sequelize = require("sequelize");

// imports variable to enable the database url to be hidden
require("dotenv").config();

// connects database to server

const db = new Sequelize(process.env.DB_NAME, 
                         process.env.DB_USER, 
                         process.env.DB_PASSWORD, 
                         {
                            host: process.env.DB_HOST,
                            port: parseInt(process.env.DB_PORT),
                            dialect: process.env.DB_DIALECT,
                            pool: {
                                max: parseInt(process.env.DB_POOL_MAX), 
                                min: parseInt(process.env.DB_POOL_MIN),
                                idle: parseInt(process.env.DB_POOL_IDLE)
                            }
                         });


/*
const db = new Sequelize(
    'advisor-app-uwi', //database name
    'advisor-app-uwi', //username
    'phe3aeB5yopha7sh', //password
    {
        host: 'www.sundaebytes.com',
        port: 5432,
        dialect: 'postgres',
        pool: {
            max: 3, 
            min: 0,
            idle: 10000,
        }
    });
*/
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
 