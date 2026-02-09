const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '', 
  database: 'todos',
};

async function findUserByLogin(login) {
  const connection = await mysql.createConnection(DB_CONFIG);
  const query = `
    SELECT users.*, roles.name as role_name 
    FROM users 
    LEFT JOIN roles ON users.role_id = roles.id 
    WHERE users.login = '${login}'
  `;

  const [rows] = await connection.query(query);
  await connection.end();

  return rows[0] || null;
}

async function createUser(login, password) {
  const connection = await mysql.createConnection(DB_CONFIG);

  const [roles] = await connection.query("SELECT id FROM roles WHERE name = 'user'");
  const userRoleId = roles[0]?.id || 2; 

  const insertQuery = `
    INSERT INTO users (login, password, role_id)
    VALUES ('${login}', '${password}', ${userRoleId})
  `;

  const [result] = await connection.query(insertQuery);
  await connection.end();

  return { id: result.insertId, login, role: 'user' };
}

async function deleteUser(login) {
  const connection = await mysql.createConnection(DB_CONFIG);

  const query = `DELETE FROM users WHERE login = '${login}'`;

  const [result] = await connection.query(query);
  
  await connection.end();

  return result.affectedRows > 0; 
}

module.exports = { findUserByLogin, createUser, deleteUser };