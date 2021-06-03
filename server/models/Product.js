const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	url: {
		type: String,
		required: true,
	},
	originalPrice: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
	},
	priceHistory: [{ type: String }],
	salePrice: { type: String },
});

const Product = mongoose.model("products", ProductSchema);

module.exports = Product;
