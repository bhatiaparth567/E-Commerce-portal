const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const db = require("./config/mongoose");
const errorMiddleware = require("./middleware/error");

dotenv.config();
const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/", require("./routes/index"));

if (process.env.NODE_ENV === "production") {
  console.log(path.join(__dirname, "../frontend/build"));
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running"));
