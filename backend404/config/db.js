const mysql = require('mysql2');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "library_db"
});

module.exports = db;
