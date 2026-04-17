const mysql = require('mysql2/promise');
const config = require('../env/reservasConfig');

const pool = mysql.createPool(config);

module.exports = pool;
