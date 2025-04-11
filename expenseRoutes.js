const express = require("express");
const router = express.Router();
const db = require("./db");

// Add a new expense
router.post("/add", async (req, res) => {
  const { userEmail, name, amount, category } = req.body;

  if (!userEmail || !name || !amount || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const date = new Date().toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });

  try {
    const [result] = await db.execute(
      "INSERT INTO expenses (userEmail, name, amount, category, date) VALUES (?, ?, ?, ?, ?)",
      [userEmail, name, amount, category, date]
    );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Error inserting expense:", err);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

// Get all expenses for a user
router.get("/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const [rows] = await db.execute(
      "SELECT * FROM expenses WHERE userEmail = ? ORDER BY id DESC",
      [email]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Delete expense by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.execute("DELETE FROM expenses WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
