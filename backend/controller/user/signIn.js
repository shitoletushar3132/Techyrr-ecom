const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const jwt = require("jsonwebtoken");

async function signIn(req, res) {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Please provide username",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please provide password",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        userId: user._id,
        username: user.username,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1d",
      });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure only in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // SameSite=None only in production
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      };

      res.cookie("token", token, cookieOptions).status(200).json({
        message: "Login successful",
        data: { token }, // Encapsulate the token in an object
        success: true,
        error: false,
      });
    } else {
      return res.status(401).json({
        message: "Invalid password",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    console.error("Error in signIn:", err); // Log the error for debugging
    res.status(500).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = signIn;
