const productModel = require("../../models/productModel");
async function getProduct(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalCount = await productModel.countDocuments();

    const products = await productModel.find().skip(skip).limit(limit).exec();

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

module.exports = getProduct;
