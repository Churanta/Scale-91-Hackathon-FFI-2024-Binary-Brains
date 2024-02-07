const Transaction = require("../models/transactionModel");

// Controller functions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTransaction = async (req, res) => {
  const transaction = new Transaction({
    amount: req.body.amount,
    sender: req.body.sender,
    recipient: req.body.recipient,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add other CRUD operations (update, delete) as needed
