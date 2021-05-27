const { Schema, model, SchemaTypes } = require("mongoose");

const priceDropSchema = new Schema({
  productId: {
    ref: "products",
    type: Schema.Types.ObjectId,
    required: true,
  },
  oldPrice: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  newPrice: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
  },
  userId: {
    ref: "user",
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const PriceDropNotification = model("PriceDropNotification", priceDropSchema);

module.exports = {
  PriceDropNotification,
};
