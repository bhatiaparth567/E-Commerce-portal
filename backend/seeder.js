const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const db = require("./config/mongoose");

dotenv.config();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminuser = createdUsers[0]._id;
    const sampleProds = products.map((prod) => {
      return { ...prod, user: adminuser };
    });
    await Product.insertMany(sampleProds);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
