const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodeapp',
    password: 'bbaral1015'
});

module.exports = pool.promise();


