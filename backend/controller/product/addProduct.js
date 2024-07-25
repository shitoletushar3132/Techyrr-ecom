const productModel = require("../../models/productModel");
const userModel = require("../../models/userModel");

async function addProduct(req, res) {
  try {
    const { name, price, description, category, company, imgUrl } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "Provide all required data",
        error: true,
        success: false,
      });
    }
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findById(userId);

    if (user.role === "admin") {
      const data = {
        name,
        price,
        description,
        category,
        company,
        imgUrl,
        userId,
      };
      const product = new productModel(data);
      const savedProduct = await product.save();
      res.status(201).json({
        message: "Product added successfully",
        error: false,
        success: true,
        data: savedProduct,
      });
    } else {
      return res.status(403).json({
        message: "You do not have permission to delete this product",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({
      message: err.message || "An error occurred",
      error: true,
      success: false,
    });
  }
}

module.exports = addProduct;
