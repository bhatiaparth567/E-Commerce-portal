const express = require("express");
const router = express.Router();

const protect = require("../../../middleware/authMiddleware");
const ordersController = require("../../../controllers/api/v1/orders_api");

router.post("/", protect.protect, ordersController.addOrderItems);
router.get("/myorders", protect.protect, ordersController.getMyOrders);
router.get("/:id", protect.protect, ordersController.getOrderById);
router.put("/:id/pay", protect.protect, ordersController.updateOrderToPaid);

module.exports = router;
