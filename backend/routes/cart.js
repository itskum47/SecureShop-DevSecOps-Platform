const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET /:userId
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items');
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /add
router.post('/add', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $push: { items: productId } },
            { upsert: true, new: true }
        ).populate('items');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /remove
router.post('/remove', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOneAndUpdate(
            { userId },
            { $pull: { items: productId } },
            { new: true }
        ).populate('items');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
