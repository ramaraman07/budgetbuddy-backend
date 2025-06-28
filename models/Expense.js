const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  amount: Number,
  date: Date,
});

module.exports = mongoose.model("Expense", expenseSchema);
