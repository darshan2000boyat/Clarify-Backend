const Bill = require("../Models/bill");
const User = require("../Models/user");

// ➕ CREATE BILL
async function billController(req, res) {
  try {
    const {
      title,
      billNumber,
      date,
      dueDate,
      businessDetail,
      clientDetails,
      products, // ✅ fixed typo
      total,
      email,
    } = req.body;

    const billDate = new Date(date);
    const billDueDate = new Date(dueDate);

    // ✅ Validate date formats
    if (isNaN(billDate.getTime()) || isNaN(billDueDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "Invalid date format. Please use 'YYYY-MM-DD' format (e.g., 2025-11-05).",
      });
    }

    // ✅ Validate due date logic
    if (billDueDate < billDate) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Due date cannot be earlier than the bill date.",
      });
    }

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    // ✅ Create and save bill
    const bill = new Bill({
      userId: user._id,
      title,
      billNumber,
      billDate,
      date,
      dueDate,
      businessDetail,
      clientDetails,
      product: products,
      total,
    });

    await bill.save();

    res.status(200).json({
      success: true,
      message: "Bill created successfully",
      error: false,
      bill,
    });

  } catch (error) {
    console.error("Error creating bill:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: `Internal Server Error: ${error.message}`,
    });
  }
}

// 📋 GET ALL BILLS FOR A USER
async function getBillsByUser(req, res) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    const bills = await Bill.find({ userId: user._id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      error: false,
      message: "Bills fetched successfully",
      bills,
    });
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: `Failed to fetch bills: ${error.message}`,
    });
  }
}

// ✏️ UPDATE BILL
async function updateBill(req, res) {
  try {
    const { billId } = req.params;
    const updateData = req.body;

    const bill = await Bill.findByIdAndUpdate(billId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!bill) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Bill updated successfully",
      bill,
    });
  } catch (error) {
    console.error("Error updating bill:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: `Failed to update bill: ${error.message}`,
    });
  }
}

// ❌ DELETE BILL
async function deleteBill(req, res) {
  try {
    const { billId } = req.params;

    const bill = await Bill.findByIdAndDelete(billId);
    if (!bill) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Bill not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: `Failed to delete bill: ${error.message}`,
    });
  }
}

module.exports = {
  billController,  // create
  getBillsByUser,  // fetch all
  updateBill,      // edit
  deleteBill,      // delete
};
