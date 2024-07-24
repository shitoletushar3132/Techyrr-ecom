const productModel = require("../../models/productModel");
async function getProduct(req, res) {
  try {
    const data = await productModel.find();
    res.status(200).json({
      message: "ok",
      data: data,
      error: false,
      successs: true,
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
