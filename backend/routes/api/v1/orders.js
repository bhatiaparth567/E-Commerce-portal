const express = require("express");
const router = express.Router();

const protect = require("../../../middleware/authMiddleware");
const ordersController = require("../../../controllers/api/v1/orders_api");

router.post("/", protect.protect, ordersController.addOrderItems);
router.get("/:id", protect.protect, ordersController.getOrderById);

module.exports = router;
