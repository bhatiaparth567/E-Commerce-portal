const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

console.log(process.env.MONGO_URI);
const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(conn.connection.host);
};
connect();

var db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("on", () => {
  console.log("successfully connected to db!");
});
