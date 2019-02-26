const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_reebsm',
  password        : '6157',
  database        : 'cs340_reebsm'
});
module.exports.pool = pool;