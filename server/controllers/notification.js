const asyncHandler = require("express-async-handler");
const PriceDropNotification = require("../models/Notification");

exports.createNotification = asyncHandler(async (req, res) => {
  res.send("Create Notification Controller");
});

exports.markAsReadNotification = asyncHandler(async (req, res) => {
  res.send("Mark As Read Notification Controller");
});

exports.getUnreadNotification = asyncHandler(async (req, res) => {
  res.send("Get Unread Notification Controller");
});

exports.getAllNotification = asyncHandler(async (req, res) => {
  res.send("Get All Notification Controller");
});
