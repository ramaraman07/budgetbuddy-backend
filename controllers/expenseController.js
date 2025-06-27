const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  const { title, amount, category, date, userId } = req.body;

  try {
    const newExpense = new Expense({
      userId,
      title,
      amount,
      category,
      date,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense", error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses", error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    await Expense.findByIdAndDelete(id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete expense", error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, date } = req.body;

  try {
    const updated = await Expense.findByIdAndUpdate(
      id,
      { title, amount, category, date },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update expense", error: err.message });
  }
};
