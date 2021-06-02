const asyncHandler = require("express-async-handler");
const { PriceDropNotification } = require("../models/Notification");
const User = require("../models/User");

// Mark as read a notification. The notification _id should be passed as parameter.
exports.markAsReadNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notificationFound = await PriceDropNotification.findOneAndUpdate(
    { _id: id },
    { read: true },
    { new: true }
  );
  if (!notificationFound) {
    res.status(404).send({ message: "Notification not Found" });
  } else {
    res.status(200).json(notificationFound);
  }
});

// Get unread Notifications. Receive userId as Param
exports.getUnreadNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const notificationsFound = await User.findOne({
    _id: userId,
  }).populate("notifications");
  const unreadNotifications = notificationsFound.notifications.filter(
    (notif) => notif.read === false
  );
  if (!notificationsFound) {
    res.status(404).send({ message: "No Notifications Found" });
  } else {
    res.status(200).json(unreadNotifications);
  }
});

// Get all notifications. Receive userId as Param
exports.getAllNotification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const notificationsFound = await User.findOne({
    _id: userId,
  }).populate("notifications");
  if (!notificationsFound) {
    res.status(404).send({ message: "No Notifications Found" });
  } else {
    res.status(200).json(notificationsFound.notifications);
  }
});
