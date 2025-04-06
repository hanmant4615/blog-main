const mysql = require("mysql2");
const config = require("./config");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: config.password,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
});

module.exports = pool;
