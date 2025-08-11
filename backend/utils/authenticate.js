const SECRET = "IAMIRONMAN";
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const verifiedToken = jwt.verify(token, SECRET);
    if (!verifiedToken) {
      return res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user= await User.findOne({ email: verifiedToken.email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
      return;
    }
    req.user = user;
    next();

  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
module.exports = authenticate;