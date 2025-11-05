const verifyToken = require("../Middlewares/middleware");

const express = require("express");
const router = express.Router();
const {
  billController,
  getBillsByUser,
  updateBill,
  deleteBill,
} = require("../Controllers/bill.controller");

// Create new bill
router.post("/create", verifyToken, billController);

// Get all bills for a user
router.post("/list", verifyToken, getBillsByUser);

// Update bill by ID
router.put("/edit/:billId", verifyToken, updateBill);

// Delete bill by ID
router.delete("/delete/:billId", verifyToken, deleteBill);

module.exports = router;
