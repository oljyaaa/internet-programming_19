const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, updateUserRole } = require('../services/userService');

// GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    try {
        const { username, role_id } = req.body;
        const newUser = await createUser(username, role_id);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT /api/users/:id 
router.put('/:id', async (req, res) => {
    try {
        const { role_id } = req.body;
        await updateUserRole(req.params.id, role_id);
        res.json({ message: 'User role updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;