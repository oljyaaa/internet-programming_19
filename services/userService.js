const mysql = require('mysql2/promise');
const config = require('./db');

async function getAllUsers() {
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.execute(`
        SELECT users.id, users.username, roles.name as role_name 
        FROM users 
        LEFT JOIN roles ON users.role_id = roles.id
    `);
    await conn.end();
    return rows;
}

async function createUser(username, role_id) {
    const conn = await mysql.createConnection(config);
    const [result] = await conn.execute(
        'INSERT INTO users (username, role_id) VALUES (?, ?)',
        [username, role_id]
    );
    await conn.end();
    return { id: result.insertId, username, role_id };
}

async function deleteUser(id) {
    const conn = await mysql.createConnection(config);
    await conn.execute('DELETE FROM users WHERE id = ?', [id]);
    await conn.end();
    return true;
}

async function updateUserRole(id, role_id) {
    const conn = await mysql.createConnection(config);
    await conn.execute('UPDATE users SET role_id = ? WHERE id = ?', [role_id, id]);
    await conn.end();
    return true;
}

module.exports = { getAllUsers, createUser, deleteUser, updateUserRole };