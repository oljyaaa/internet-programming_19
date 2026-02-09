const mysql = require('mysql2/promise');
const config = require('./db');

async function getAllPermissions() {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute('SELECT * FROM permissions');
    await conn.end();
    return rows;
}

module.exports = { getAllPermissions };