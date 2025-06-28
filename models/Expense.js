const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authenticate = require("../middleware/auth");

// Add expense
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const newExpense = new Expense({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while adding expense." });
  }
});

// Get all expenses for the logged-in user
router.get("/", authenticate, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching expenses." });
  }
});

module.exports = router;
