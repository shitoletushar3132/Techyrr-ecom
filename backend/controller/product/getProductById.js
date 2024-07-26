const productModel = require("../../models/productModel");

async function getProductById(req, res) {
  try {
    const productId = req.params.productId;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.status(200).json({
      message: "Product retrieved successfully",
      error: false,
      success: true,
      data: product,
    });
  } catch (err) {
    console.error("Error in getProductById:", err);
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
}

module.exports = getProductById;
