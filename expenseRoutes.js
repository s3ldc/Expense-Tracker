const express = require('express');
const router = express.Router();
const db = require('./db');

// Add an expense
router.post('/add', (req, res) => {
  const { userEmail, name, amount, category } = req.body;

  if (!userEmail || !name || !amount || !category) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const date = new Date().toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });

  const sql = 'INSERT INTO expenses (userEmail, name, amount, category, date) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [userEmail, name, amount, category, date], (err, result) => {
    if (err) {
      console.error('Error adding expense:', err);
      return res.status(500).json({ message: 'Failed to add expense' });
    }
    res.status(200).json({ message: 'Expense added successfully' });
  });
});

// Get all expenses for a user
router.get('/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;

  const sql = 'SELECT * FROM expenses WHERE userEmail = ? ORDER BY id DESC';
  db.query(sql, [userEmail], (err, results) => {
    if (err) {
      console.error('Error fetching expenses:', err);
      return res.status(500).json({ message: 'Failed to fetch expenses' });
    }
    res.status(200).json(results);
  });
});

// Delete an expense
router.delete('/:id', (req, res) => {
  const expenseId = req.params.id;

  const sql = 'DELETE FROM expenses WHERE id = ?';
  db.query(sql, [expenseId], (err, result) => {
    if (err) {
      console.error('Error deleting expense:', err);
      return res.status(500).json({ message: 'Failed to delete expense' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  });
});

module.exports = router;
