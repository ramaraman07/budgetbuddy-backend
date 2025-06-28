const express = require("express");
const Expense = require("../models/Expense");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Get all expenses
router.get("/", verifyToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// Add expense
router.post("/", verifyToken, async (req, res) => {
  const { title, amount, date } = req.body;

  try {
    const newExpense = new Expense({
      userId: req.user.id,
      title,
      amount,
      date,
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added" });
  } catch {
    res.status(500).json({ error: "Failed to add expense" });
  }
});

module.exports = router;
