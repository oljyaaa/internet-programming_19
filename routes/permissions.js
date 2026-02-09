const express = require('express');
const router = express.Router();
const { getAllPermissions } = require('../services/permissionService');

router.get('/', async (req, res) => {
    try {
        const perms = await getAllPermissions();
        res.json(perms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;