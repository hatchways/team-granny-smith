const express = require("express");
const protect = require("../middleware/auth");
const router = express.Router();
const {
  addList,
  removeList,
  updateList,
  findList
} = require("../controllers/list");

router.route("/addList").post(protect, addList);

router.route("/removeList/:id").delete(protect, removeList);

router.route("/updateLis/:id").patch(protect, updateList);

router.route("/findList").get(protect, findList);

module.exports = router;
