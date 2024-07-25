const productModel = require("../../models/productModel");
const mongoose = require("mongoose");
const userModel = require("../../models/userModel");

async function updateProduct(req, res) {
  try {
    const { productId, updateData } = req.body;

    console.log("product updatae", productId, updateData);
    const userId = req.userId;

    if (!productId || !updateData || !userId) {
      return res.status(400).json({
        message: "Product ID, user ID, and update data are required",
        error: true,
        success: false,
      });
    }

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid Product ID",
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

    if (user.role === "admin") {
      if (product.userId.toString() !== userId.toString()) {
        return res.status(403).json({
          message: "You're not the owner of this product",
          error: true,
          success: false,
        });
      }
      const updatedProduct = await productModel
        .findByIdAndUpdate(productId, updateData, {
          new: true,
          runValidators: true,
        })
        .exec();

      res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
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

module.exports = updateProduct;
