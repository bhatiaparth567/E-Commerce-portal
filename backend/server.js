const express = require("express");
const app = express();

app.use("/", require("./routes/index"));
app.listen(5000, console.log("server is running"));
