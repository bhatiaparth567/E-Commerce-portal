const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Sumant Pathak",
    email: "sumant@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Shantanu Pathak",
    email: "shantanu@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = users;
