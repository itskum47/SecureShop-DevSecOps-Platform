const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /login
// Vulnerability: NoSQL Injection (passes req.body directly to findOne without validation)
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne(req.body);
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                token: 'dummy-token' // Simple dummy token for now
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /register
router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.create({ email, username, password });
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: 'dummy-token'
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
