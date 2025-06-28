const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const authMiddleware = require("../middleware/auth");

// ➕ Create Expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const newExpense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense", error: err.message });
  }
});

// 📄 Get All Expenses for a User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
});

// 🗑️ Delete Expense by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✏️ Update/Edit Expense
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense", error: err.message });
  }
});

module.exports = router;
