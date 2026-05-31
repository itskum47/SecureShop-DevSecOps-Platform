const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// POST /
router.post('/', async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await Cart.findOne({ userId });
        
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const order = await Order.create({ userId, items: cart.items });
        
        // Clear the user's cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });
        
        res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
