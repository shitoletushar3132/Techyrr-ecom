const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");

async function adminProductsPagination(req, res) {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        message: "You do not have permission to access these products",
        error: true,
        success: false,
      });
    }

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    console.log(page, limit);

    // Calculate pagination details
    const skip = (page - 1) * limit;

    // Get the total count of products
    const totalCount = await productModel.countDocuments({ userId: user._id });

    // Fetch paginated products
    const products = await productModel
      .find({ userId: user._id })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
      },
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = adminProductsPagination;
