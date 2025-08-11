const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = "IAMIRONMAN";
const User = require("../models/user.model");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password,role, address} = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log(req.body);
    const newUser = new User({
      name,
      email,
      password,
      address,
      role: role || "user",
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully"});
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
    console.error("Error details:", error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existingUser.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email }, SECRET, { expiresIn: "15d" });


    res.status(200).json({ message: "User signed in successfully", token });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing in", error });
  }
});
module.exports = router;