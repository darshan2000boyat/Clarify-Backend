
const verifyToken = require("../Middlewares/middleware");

const express = require("express");
const {
  createQuotation,
  getUserQuotations,
  editQuotation,
  deleteQuotation,
} = require("../Controllers/quotation.controller");

const router = express.Router();

// Create new quotation
router.post("/create", verifyToken, createQuotation);

// Fetch all quotations for a user
router.post("/list", verifyToken, getUserQuotations);

// Edit quotation
router.put("/:id", verifyToken, editQuotation);

// Delete quotation
router.delete("/:id", verifyToken, deleteQuotation);

module.exports = router;
