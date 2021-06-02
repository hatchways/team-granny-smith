const { Schema, model, SchemaTypes } = require("mongoose");

const priceDropNotificationSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  oldPrice: {
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
    default: false
  },
});

const PriceDropNotification = model("PriceDropNotification", priceDropNotificationSchema);

module.exports = {
  PriceDropNotification,
};
