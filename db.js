// imports sequelize module
const Sequelize = require("sequelize");

// const url = 'postgres://myadvisor_database_user:YuKpP0lz6KhxNnsRLExqDQrl64bJj6OS@dpg-ci1kmm0rddl1m6hknfbg-a.oregon-postgres.render.com/myadvisor_database';

// // Extracting database connection information from the URL
// const [, dialect, username, password, host, database] = url.match(/^(postgres):\/\/([^:]+):([^@]+)@([^/]+)\/(.+)$/);


//SQLITE DATABASE
// SQLite database configuration
const db = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite', // Replace with the path to your SQLite database file
  pool: {
    max: 50, // Maximum number of connections in the pool
    min: 0,  // Minimum number of connections in the pool
    acquire: 30000, // Maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000  // Maximum time, in milliseconds, that a connection can be idle before being closed
  },
  dialectOptions: {
    // Enable WAL mode
    // https://sqldocs.org/sqlite/sqlite-write-ahead-logging/#when-to-use-wal-mode
    mode: Sequelize.QueryTypes.WAL
  }
});

// Increase the busy timeout
db.query('PRAGMA busy_timeout = 30000;'); // Set busy timeout to 30 seconds

// Enable WAL mode
db.query('PRAGMA journal_mode = WAL;');


// const db = new Sequelize({
//   dialect: 'sqlite',
//   logging: false,
//   storage: 'database.sqlite', // Replace with the path to your SQLite database file
// });


// //CONNECTS TO THE RENDER POSTGRES DATABASE
// const db = new Sequelize(database, username, password, {
//   host,
//   dialect,
//   dialectOptions: {
//     ssl: true,
//   }
// });


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

// // tests database connection on server startup to see if the connection is OK.
// db.authenticate()
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.log("Error: " + err));

module.exports = db;

