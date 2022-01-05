const CreateError = require("http-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// import routers
const messageRouter = require("./routes/messageRouter");
const itemRouter = require("./routes/itemRouter");
const productRouter = require("./routes/productRouter");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to Connect to MongoDB", error));

// middleware
app.use(express.static("build"));
app.use(cors());
app.use(express.json());

// routes
app.use("/api/messages", messageRouter);
app.use("/api/supplies", itemRouter);
app.use("/api/products", productRouter);

app.get("*", (_request, response) => {
	response.redirect("/");
});

// unknown end-point handler
app.use((_request, _response, next) => {
  next(CreateError(404));
});

// error handler
app.use((error, _request, response, next) => {
  console.log(error);
  return response.status(error.status || 500).json({ error: error.message });
});

module.exports = app; 