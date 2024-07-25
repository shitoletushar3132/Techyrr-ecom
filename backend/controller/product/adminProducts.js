const userModel = require("../../models/userModel");
const productModel = require("../../models/productModel");
async function adminProducts(req, res) {
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

    if (
      user.role === "admin" ||
      product.userId.toString() === user._id.toString()
    ) {
      const products = await productModel.find({ userId: user._id }).exec();

      res.status(200).json({
        message: "Product fetch successfully",
        data: products,
        error: false,
        success: true,
      });
    } else {
      return res.status(403).json({
        message: "You do not have permission to delete this product",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = adminProducts;
