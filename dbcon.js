const mysql = require('mysql');
const pool = mysql.createPool(process.env.DB_URL);
module.exports.pool = pool;