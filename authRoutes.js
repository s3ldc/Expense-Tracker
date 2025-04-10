const express = require("express");
const router = express.Router();
const db = require("./db");

// Sign up route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Insert new user
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);

    if (user.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: user[0] });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
