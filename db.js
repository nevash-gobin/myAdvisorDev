// imports sequelize module
const Sequelize = require("sequelize");

const url = 'postgres://myadvisor_database_user:YuKpP0lz6KhxNnsRLExqDQrl64bJj6OS@dpg-ci1kmm0rddl1m6hknfbg-a.oregon-postgres.render.com/myadvisor_database';

// Extracting database connection information from the URL
const [, dialect, username, password, host, database] = url.match(/^(postgres):\/\/([^:]+):([^@]+)@([^/]+)\/(.+)$/);

// connects database to server
const db = new Sequelize(database, username, password, {
  host,
  dialect,
  dialectOptions: {
    ssl: true,
  }
});

// const db = new Sequelize({
//   dialect: "postgres",
//   host: "YuKpP0lz6KhxNnsRLExqDQrl64bJj6OS@dpg-ci1kmm0rddl1m6hknfbg-a.oregon-postgres.render.com/myadvisor_database",
//   port: "5432",
//   database: "myadvisor_database",
//   username: "myadvisor_database_user",
//   password: "YuKpP0lz6KhxNnsRLExqDQrl64bJj6OS",
//   pool: {
//     max: 3,
//     min: 0,
//     idle: 10000,
//   },
// });

// tests database connection on server startup to see if the connection is OK.
db.authenticate()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error: " + err));

module.exports = db;

