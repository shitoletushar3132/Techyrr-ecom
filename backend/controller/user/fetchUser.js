const userModel = require("../../models/userModel");
async function useDetailsController(req, res) {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User detail",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = useDetailsController;
