const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user.model");
const authenticate = require("../utils/authenticate");
const Product = require("../models/product.model");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

router.post("/place", authenticate, async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .sort({ createdAt: -1 });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Filter out items with missing products
    const validItems = cart.items.filter((item) => item.product);

    if (validItems.length === 0) {
      return res.status(400).json({ message: "No valid products in cart" });
    }

    const totalAmount = validItems.reduce((total, item) => {
      return Number(total) + Number(item.product.price) * Number(item.quantity);
    }, 0);

    const order = new Order({
      user: userId,
      products: validItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        imgUrl: item.product.imgUrl,
        name: item.product.name,
      })),
      totalAmount,
      imgUrl: validItems[0].product.imgUrl,
      name: validItems[0].product.name, // <-- Add name at root to satisfy schema
    });

    await order.save();
    await Cart.deleteOne({ user: userId });
    res.status(200).json({ message: "Order Placed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    console.error("Error details:", error);
  }
});

router.post("/my-orders", authenticate, async (req, res) => {
  try {
    const products = await Order.find({ user: req.user._id });

    if (!products) {
      return res.status(404).json({ message: "No Orders found in the cart" });
    }
    res.status(200).json({ message: "Orders fetched successfully", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;