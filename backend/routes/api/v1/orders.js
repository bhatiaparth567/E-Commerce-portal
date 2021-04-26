const express = require("express");
const router = express.Router();

const protect = require("../../../middleware/authMiddleware");
const ordersController = require("../../../controllers/api/v1/orders_api");

router.post("/", protect.protect, ordersController.addOrderItems);
router.get("/", protect.protect, protect.admin, ordersController.getOrders);
router.get("/myorders", protect.protect, ordersController.getMyOrders);
router.get("/:id", protect.protect, ordersController.getOrderById);
router.put("/:id/pay", protect.protect, ordersController.updateOrderToPaid);
router.put(
  "/:id/deliver",
  protect.protect,
  protect.admin,
  ordersController.updateOrderToDelivered
);

module.exports = router;
