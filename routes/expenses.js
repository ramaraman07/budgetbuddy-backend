// server/routes/expenses.js
const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth");

// @route   POST /api/expenses
// @desc    Add a new expense
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      user: req.userId,
      title,
      amount,
      category,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error("❌ Add Expense Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
