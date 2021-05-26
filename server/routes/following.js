const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
	getFollowing,
	getPeopleYouMightKnow,
	followOrUnfollow,
} = require("../controllers/following");

router.route("/").get(protect, getFollowing);
router.route("/peopleYouMightKnow").get(protect, getPeopleYouMightKnow);
router.route("/followOrUnfollow").post(protect, followOrUnfollow);

module.exports = router;
