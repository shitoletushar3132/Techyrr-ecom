const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  try {
    const { password, ...userData } = req.body;

    if (!password) {
      throw new Error("please provide password");
    }
    if (!userData.username) {
      throw new Error("please provide username");
    }

    const userNam = userData.username;
    const user = await userModel.findOne({ username: userNam });

    if (user) {
      res.status(401).json({
        success: false,
        error: true,
        message: "User already Register",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userSave = new userModel({ ...userData, password: hash });
    const save = await userSave.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "Register successfully",
      data: save,
    });
  } catch (err) {
    res.status(400).json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = register;
