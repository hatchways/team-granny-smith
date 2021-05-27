const Following = require("../models/Following");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const smartSearch = require("../utils/smartSearch");

// @route GET /following
// @desc get user's following list
// @access Private
exports.getFollowing = asyncHandler(async (req, res, next) => {
	const data = await Following.findOne(
		{ userId: req.user.id },
		{ _id: 0, following: 1 }
	).populate("following", "_id username image");

	//in case the user has not followed anyone yet
	if (!data) {
		res.status(200).json({
			success: {
				followingList: [],
			},
		});
	}
	res.status(200).json({
		success: {
			followingList: data.following,
		},
	});
});

// @route GET /following/suggestions
// @desc returns a list of the peaple the user might know
// @access Private
exports.getPeopleYouMightKnow = asyncHandler(async (req, res, next) => {
	const userRelations = await Following.findOne({ userId: req.user.id }).populate(
		"followers",
		"_id username image"
	);

	// returns the users that follow the user but the user does not follow back and
	// a list of users that should be excluded from our broader search
	const { excludeFromSearch, noFollowBack } = smartSearch(userRelations, req.user.id);

	//returns the users that their id does not exist in the excludedFromSearch list
	const searchResult = await User.find(
		{
			_id: {
				$nin: excludeFromSearch,
			},
		},
		"_id username image"
	);

	//In the final result the people who follow the user but the user
	//does not follow back will be at the top of the list, which leads to
	//an smarter result for the people you might know section of the app
	const finalResponse = [...noFollowBack, ...searchResult];

	res.json(finalResponse);
});

// @route POST /following/follow
// @desc lets the user follow or unfollow another user based on req.body.action (It can be either follow or unfollow)
// @access Private
exports.followOrUnfollow = asyncHandler(async (req, res, next) => {
	const { userIdToFollowOrUnfollow, action } = req.body;
	const mongooseFileter = { userId: req.user.id };
	let addedOrDeletedUser;
	if (!userIdToFollowOrUnfollow || (action !== "follow" && action !== "unfollow")) {
		res.status(400);
		throw new Error("Invalid data");
	}

	let mongooseOperation = "";
	let successMessage = "";

	if (action === "follow") {
		// if the action is follow we should add to our database so the operation would be $push
		mongooseOperation = "$push";
		successMessage = "User was followed successfuly";
	} else {
		// if the action is unfollow we should remove from our database so the operation would be $pull
		mongooseOperation = "$pull";
		successMessage = "User was unfollowed successfuly";
	}

	//add to or remove from the following list of the logged in user
	await Following.updateOne(
		mongooseFileter,
		{ [mongooseOperation]: { following: userIdToFollowOrUnfollow } },
		{
			upsert: true, // Make this update into an upsert in case user doesnt exist in the model
		}
	);

	//add or remove the logged in user from that other user's list of followers
	await Following.updateOne(
		{ userId: userIdToFollowOrUnfollow },
		{ [mongooseOperation]: { followers: req.user.id } },
		{
			upsert: true, // Make this update into an upsert in case user doesnt exist in the model
		}
	);

	//the addedOrDeletedUser data would be necessary for our frontend
	addedOrDeletedUser = await User.findById(userIdToFollowOrUnfollow);

	res.status(201).json({
		message: successMessage,
		userAddedOrDeleted: {
			id: addedOrDeletedUser._id,
			username: addedOrDeletedUser.username,
		},
	});
});
