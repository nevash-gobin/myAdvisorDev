import Sequelize from "sequelize";

// connects database to server
const db = new Sequelize(
    "postgres://lnbdhmxy:t-d1hx...@ziggy.db.elephantsql.com:5432/lnbdhmxy"
);

// tests database connection on server start up
db.authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Error: " + err));

module.exports = db;
