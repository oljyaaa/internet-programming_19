const express = require('express');
const router = express.Router();
const { getAllRoles, createRole } = require('../services/roleService');

router.get('/', async (req, res) => {
    try {
        const roles = await getAllRoles();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await createRole(req.body.name);
        res.status(201).json({ message: 'Role created' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;