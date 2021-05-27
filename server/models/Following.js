const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		reqiuered: true,
	},
	following: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	],
	followers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
		},
	],
});

const Following = mongoose.model("following", FollowingSchema);

module.exports = Following;
