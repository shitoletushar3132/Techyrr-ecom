const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to dataBase");
  } catch (error) {
    console.log("error in connection DB ", error);
  }
};

module.exports = connectDB;
