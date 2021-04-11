const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use("/", require("./routes/index"));

app.listen(PORT, console.log("server is running"));
