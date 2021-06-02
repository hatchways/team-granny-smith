const express = require("express");
const router = express.Router();

const {
  getPublicLists,
  getPublicListProducts,
} = require("../controllers/publicLists");

router.route("/").get(getPublicLists);

router.route("/:listId").get(getPublicListProducts);

module.exports = router;
