// order.model.js

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  ownerId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true,
    type: String,
    required: true,
  },
  buyerIds: [{
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: true,
  }],
  productId: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Product',
    // required: true,
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productMongoDBId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;