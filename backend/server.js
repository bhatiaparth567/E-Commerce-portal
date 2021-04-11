const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/mongoose");

dotenv.config();
const app = express();

app.use("/", require("./routes/index"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running"));
