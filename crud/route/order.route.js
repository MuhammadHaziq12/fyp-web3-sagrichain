const express = require('express');
const router = express.Router();
const { createOrder, getOrders } = require('../controllers/order.controller');

// Create a new order
router.post('/', createOrder);
router.get('/', getOrders);

module.exports = router;
