const express = require("express");
const test = require("../controller/test");
const register = require("../controller/user/register");
const signIn = require("../controller/user/signIn");
const addProduct = require("../controller/product/addProduct");
const getProduct = require("../controller/product/getProduct");
const updateProduct = require("../controller/product/updateProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const authToken = require("../middleware/authToken");
const getProductById = require("../controller/product/getProductById");
const useDetailsController = require("../controller/user/fetchUser");
const logOut = require("../controller/user/logout");
const adminProducts = require("../controller/product/adminProducts");
const adminProductsPagination = require("../controller/product/adminProductPaginatio");
const router = express.Router();

router.post("/", test);

//user
router.post("/register", register);
router.post("/signin", signIn);
router.get("/user-detail", authToken, useDetailsController);
router.get("/logout", authToken, logOut);

//product
router.post("/add-product", authToken, addProduct);
router.post("/update-product", authToken, updateProduct);
router.get("/products", getProduct);
router.get("/product/:productId", getProductById);
router.post("/delete-product", authToken, deleteProduct);
router.get("/admin-product", authToken, adminProducts);
router.get("/admin-pagination", authToken, adminProductsPagination);

module.exports = router;
