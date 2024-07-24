const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function deleteProduct(req, res) {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    if (!productId || !userId) {
      return res.status(400).json({
        message: "Product ID and user ID are required",
        error: true,
        success: false,
      });
    }

    const product = await productModel.findById(productId).exec();

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

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
      const deletedProduct = await productModel
        .findByIdAndDelete(productId)
        .exec();

      res.status(200).json({
        message: "Product deleted successfully",
        data: deletedProduct,
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
    console.error("Error in deleteProduct:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = deleteProduct;
