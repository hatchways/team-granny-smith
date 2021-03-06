const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { setScraperInterval } = require("./utils/taskQueues");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const uploadRoute = require("./routes/upload");
const notificationRoute = require("./routes/notification");
const followingRoute = require("./routes/following.js");
const listRouter = require("./routes/list");
const productRouter = require("./routes/product");
const { ConnectContactLens } = require("aws-sdk");
const { connected } = require("process");


const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Web Client starts a websocket connection. Each one is saved in connectedUsers list
let connectedUsers = {};
io.on("connection", (socket) => {
  connectedUsers[socket.id] = null;
  // When the user Logs In, the connection is associated with the username
  socket.on("login", (data) => {
    connectedUsers[socket.id] = data.username;
  });
  // When the user Logs Out, the connection disassociates username
  socket.on("logout", (data) => {
    connectedUsers[socket.id] = null;
  });
  // When connection closes, it is retired from list
  socket.on("disconnect", (reason) => {
    delete connectedUsers[socket.id];
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/upload", uploadRoute);
app.use("/notification", notificationRoute);
app.use("/following", followingRoute);
app.use("/list", listRouter);
app.use("/product", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html"),
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Set Amazon/Ebay/Craigslist scraper interval
// Cron expression is in the order of "seconds minute hour dayOfMonth dayOfWeek"
// Current setting is once a day at 12:00 AM.
setScraperInterval("0 0 * * * *");

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
