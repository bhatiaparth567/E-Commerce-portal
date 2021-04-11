const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/mongoose");

dotenv.config();
const app = express();

app.use("/", require("./routes/index"));
app.use((req, res) => {
  const error = new Error(`Not found- ${req.originalUrl}`);
  res.status(404);
  next(error);
});
app.use((err, req, res, next) => {
  const error = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(error);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running"));
