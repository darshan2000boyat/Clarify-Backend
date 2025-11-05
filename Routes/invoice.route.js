const verifyToken = require("../Middlewares/middleware");
const express = require("express");

const {
  createInvoice,
  getUserInvoices,
  editInvoice,
  deleteInvoice,
} = require("../Controllers/invoice.controller");

const router = express.Router();

// Create new invoice
router.post("/create", verifyToken, createInvoice);

// Fetch all invoices of user
router.post("/list", verifyToken, getUserInvoices);

// Edit invoice
router.put("/:id", verifyToken, editInvoice);

// Delete invoice
router.delete("/:id", verifyToken, deleteInvoice);

module.exports = router;
