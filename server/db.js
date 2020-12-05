/** @format */

const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'usersdb',
  password: 'password',
});

module.exports = db;
