const asyncHandler = require("express-async-handler");
const { PriceDropNotification } = require("../models/Notification");
const Product = require("../models/Product");

exports.createNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  const alreadyAdded = await PriceDropNotification.find({ productId, userId });
  if (alreadyAdded) {
    res.status(409).send({ message: "Notification already Added" });
  }
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).send({ message: "Product not Found" });
  } else {
    const priceDropNotification = await PriceDropNotification.create({
      productId,
      oldPrice: product.price,
      url: product.url,
      read: false,
      userId,
    });

    if (priceDropNotification) {
      res.status(201).json({
        success: {
          priceDropNotification: {
            id: priceDropNotification._id,
            productId: priceDropNotification.productId,
            oldPrice: priceDropNotification.oldPrice,
            url: priceDropNotification.url,
            userId: priceDropNotification.userId,
          },
        },
      });
    } else {
      res.status(400);
      throw new Error("Invalid notification data");
    }
  }
});

exports.markAsReadNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notificationFound = await PriceDropNotification.findOneAndUpdate(
    { _id: id },
    { read: true },
    { new: true }
  );

  if (!notificationFound) {
    res.status(404).send({ message: "Notification not Found" }, {});
  } else {
    res.status(200).json(notificationFound);
  }
});

exports.getUnreadNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const notificationsFound = await PriceDropNotification.find({
    userId,
    read: false,
  });
  if (!notificationsFound) {
    res.status(404).send({ message: "Notification not Found" }, {});
  } else {
    res.status(200).json(notificationsFound);
  }
});

exports.getAllNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const notificationsFound = await PriceDropNotification.find({
    userId: userId,
  });
  if (!notificationsFound) {
    res.status(404).send({ message: "Notification not Found" }, {});
  } else {
    res.status(200).json(notificationsFound);
  }
});
