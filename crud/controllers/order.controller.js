const Order = require('../models/order.model');

const createOrder = async (req, res) => {
  try {
    const { buyerIds, ownerId, productId, productName, productMongoDBId } = req.body; // Added productMongoDBId
    // Create the order
    const order = await Order.create({
      buyerIds,
      ownerId,
      productId,
      productName,
      productMongoDBId, // Include productMongoDBId here
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getOrders
};