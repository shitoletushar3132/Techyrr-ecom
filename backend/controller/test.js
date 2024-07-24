const userModel = require("../models/userModel");

async function test(req, res) {
  try {
    const upload = new userModel(req.body);
    const save = await upload.save();

    res.json({ data: save, message: "save successfully" });
  } catch (error) {
    res.json({
      error: error,
    });
  }
}

module.exports = test;
