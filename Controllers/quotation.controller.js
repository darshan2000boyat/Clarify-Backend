const Quotation = require("../Models/quotation");
const User = require("../Models/user");

/**
 * Create a new quotation
 */
async function createQuotation(req, res) {
  try {
    const {
      title,
      quotationNumber,
      date,
      businessDetail,
      clientDetails,
      products,
      total,
      email,
    } = req.body;

    const quotationDate = new Date(date);

    if (isNaN(quotationDate.getTime())) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Invalid date format. Please use 'YYYY-MM-DD' format (e.g., 2025-11-05).",
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

    const quotation = new Quotation({
      userId: user._id,
      title,
      quotationNumber,
      quotationDate,
      date,
      businessDetail,
      clientDetails,
      product: products,
      total,
    });

    await quotation.save();

    res.status(201).json({
      success: true,
      message: "Quotation created successfully.",
      error: false,
      quotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Server error: ${error.message}`,
    });
  }
}

/**
 * Get all quotations for a user by email
 */
async function getUserQuotations(req, res) {
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

    const quotations = await Quotation.find({ userId: user._id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      error: false,
      quotations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error fetching quotations: ${error.message}`,
    });
  }
}

/**
 * Edit (update) a quotation by ID
 */
async function editQuotation(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedQuotation = await Quotation.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedQuotation) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Quotation not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Quotation updated successfully.",
      quotation: updatedQuotation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error updating quotation: ${error.message}`,
    });
  }
}

/**
 * Delete a quotation by ID
 */
async function deleteQuotation(req, res) {
  try {
    const { id } = req.params;

    const deletedQuotation = await Quotation.findByIdAndDelete(id);

    if (!deletedQuotation) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Quotation not found.",
      });
    }

    res.status(200).json({
      success: true,
      error: false,
      message: "Quotation deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: `Error deleting quotation: ${error.message}`,
    });
  }
}

module.exports = {
  createQuotation,
  getUserQuotations,
  editQuotation,
  deleteQuotation,
};
