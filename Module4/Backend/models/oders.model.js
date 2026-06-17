const mongoose = require('mongoose');
const userModel = require('../models/users.model');
const productModel = require("../models/products.model");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Users collection
    required: true,
    ref: userModel
  },
  orders: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to Products collection
        required: true,
        ref: productModel
      },
      count: {
        type: Number,
        required: true,
        min: 1
      },
      amount: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  totalAmount:{
    type: Number,
    required: true,
    min: 0    
  }
},{
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);