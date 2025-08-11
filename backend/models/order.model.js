const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;