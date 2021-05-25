const { Schema, model } = require("mongoose");

const priceDropSchema = new Schema({
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
  },
  itemInformation: String,
  date: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
  },
});

const PriceDrop = model("Product", priceDropSchema);

module.exports = {
  PriceDrop,
};
