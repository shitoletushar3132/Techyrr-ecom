const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  imgUrl: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: [true, "Provide Product Name"],
  },
  description: {
    type: String,
    required: [true, "Provide description"],
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Provide price"],
  },
  category: {
    type: String,
    required: [true, "Provide its category"],
  },
  company: {
    type: String,
    default: "",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
