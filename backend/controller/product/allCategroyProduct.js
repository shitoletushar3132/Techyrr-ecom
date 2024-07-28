const productModel = require("../../models/productModel");

async function allProduct(req, res) {
  try {
    const category = req.query.category;

    if (!category) {
      return res.json({
        message: "Category query parameter is missing",
        data: [],
        success: false,
        error: true,
      });
    }

    console.log("category", category);

    const data = await productModel.find({ category: category });

    res.json({
      message: "Products fetched successfully",
      data: data,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allProduct;
