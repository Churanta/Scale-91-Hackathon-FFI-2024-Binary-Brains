const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");

// Routes
router.get("/", transactionController.getAllTransactions);
router.post("/", transactionController.createTransaction);

// Add other CRUD routes (update, delete) as needed

module.exports = router;
