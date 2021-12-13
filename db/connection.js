const mysql = require('mysql');

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  user            : 'bsale_test',
  password        : 'bsale_test',
  database        : 'bsale_test',
});


module.exports = pool;