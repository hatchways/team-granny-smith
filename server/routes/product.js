const express = require("express");
const protect = require("../middleware/auth");
const router = express.Router();
const {
  addProduct,
  removeProduct,
  updateProduct,
  findProduct
} = require("../controllers/product");

router.route("/addProduct/:id").post(protect, addProduct);

router.route("/removeProduct").delete(protect, removeProduct);

router.route("/updateProduct/:id").patch(protect, updateProduct);

router.route("/findProducts/:id").get(protect, findProduct);

module.exports = router;
