// async function login(req, res) {
//   const body = req.body;

//   console.log(`User logged in with login - ${body.login} and password - ${body.password}`);

//   return res.status(200).send({ login: body.login, password: body.password, loggedIn: true });
// }

// module.exports = { login };

const { findUserByLogin, createUser, deleteUser } = require('../services/userService');

async function login(req, res) {
  try {
    const body = req.body;
    if (!body.login || !body.password) {
      return res.status(400).send({ error: 'Login and password are required' });
    }

    const user = await findUserByLogin(body.login);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    if (user.password !== body.password) {
      return res.status(401).send({ error: 'Invalid password' });
    }

    console.log(`User ${user.login} logged in! Role: ${user.role_name}`);

    return res.status(200).send({ 
      login: user.login, 
      role: user.role_name, 
      loggedIn: true 
    });

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const body = req.body;

    if (!body.login || !body.password) {
      return res.status(400).send({ error: 'Login and password are required' });
    }

    const existing = await findUserByLogin(body.login);
    if (existing) {
      return res.status(409).send({ error: 'User already exists' });
    }

    const newUser = await createUser(body.login, body.password);
    return res.status(201).send({ message: 'User created', user: newUser });

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}


async function removeUser(req, res) {
  try {
    const body = req.body;

    if (!body.login) {
      return res.status(400).send({ error: 'Login is required' });
    }

    const isDeleted = await deleteUser(body.login);

    if (isDeleted) {
      return res.status(200).send({ message: `User '${body.login}' deleted successfully` });
    } else {
      return res.status(404).send({ error: 'User not found' });
    }

  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
}

module.exports = { login, register, removeUser };