const mysql = require('mysql2/promise');
const config = require('./db');

async function getAllRoles() {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute('SELECT * FROM roles');
    await conn.end();
    return rows;
}

async function createRole(name) {
    const conn = await mysql.createConnection(config);
    await conn.execute('INSERT INTO roles (name) VALUES (?)', [name]);
    await conn.end();
    return { name };
}

module.exports = { getAllRoles, createRole };