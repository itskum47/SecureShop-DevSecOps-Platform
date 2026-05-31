const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Dummy hardcoded AWS key directly in code
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";

// GET /
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /search
// Vulnerability: NoSQL Injection (passes req.query directly into Product.find)
router.get('/search', async (req, res) => {
    try {
        const products = await Product.find(req.query);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
