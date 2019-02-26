const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : DB_HOST,
  user            : DB_USER,
  password        : DB_PASSWORD,
  database        : DB_NAME
});
module.exports.pool = pool;