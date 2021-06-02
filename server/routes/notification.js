const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  markAsReadNotification,
  getUnreadNotification,
  getAllNotification,
} = require("../controllers/notification");


router.route("/:id").put(protect, markAsReadNotification);

router.route("/unread/:userId").get(protect, getUnreadNotification);

router.route('/:userId').get(protect, getAllNotification);

module.exports = router;
