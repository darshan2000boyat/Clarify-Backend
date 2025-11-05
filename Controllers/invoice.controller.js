const Invoice = require("../Models/invoice");
const User = require("../Models/user");

/**
 * Create a new invoice
 */
async function createInvoice(req, res) {
  try {
    const {
      title,
      invoiceNumber,
      date,
      dueDate,
      businessDetail,
      clientDetails,
      products,
      total,
      email,
    } = req.body;

    console.log("Request Body:", req.body);

    const invoiceDate = new Date(date);
    const invoiceDueDate = new Date(dueDate);

    if (isNaN(invoiceDate.getTime()) || isNaN(invoiceDueDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: true,
        message:
          "Invalid date format. Please use 'YYYY-MM-DD' format (e.g., 2025-11-05).",
      });
    }

    if (invoiceDueDate < invoiceDate) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Due date cannot be earlier than the invoice date.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    const invoice = new Invoice({
      userId: user._id,
      title,
      invoiceNumber,
      date,
      dueDate,
      businessDetail,
      clientDetails,
      product: products,
      total,
    });

    await invoice.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Invoice created successfully.",
      invoice,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: `Server error: ${error.message}`,
    });
  }
}

/**
 * Get all invoices for a user by email
 */
async function getUserInvoices(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found.",
      });
    }

    const invoices = await Invoice.find({ userId: user._id }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      error: false,
      invoices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error fetching invoices: ${error.message}`,
    });
  }
}

/**
 * Edit (update) an invoice by ID
 */
async function editInvoice(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Invoice updated successfully.",
      invoice: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error updating invoice: ${error.message}`,
    });
  }
}

/**
 * Delete an invoice by ID
 */
async function deleteInvoice(req, res) {
  try {
    const { id } = req.params;

    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Invoice not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error deleting invoice: ${error.message}`,
    });
  }
}

module.exports = {
  createInvoice,
  getUserInvoices,
  editInvoice,
  deleteInvoice,
};
