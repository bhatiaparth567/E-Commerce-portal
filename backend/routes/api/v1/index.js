const express = require("express");
const router = express.Router();

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/orders", require("./orders"));
router.get("/config", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
router.use("/upload", require("./upload"));

module.exports = router;
