const express = require("express");
const router = express.Router();

const protect = require("../../../middleware/authMiddleware");
const productsController = require("../../../controllers/api/v1/products_api");

router.get("/", productsController.getProducts);
router.post(
  "/",
  protect.protect,
  protect.admin,
  productsController.createProduct
);
router.get("/:id", productsController.getProductsById);
router.delete(
  "/:id",
  protect.protect,
  protect.admin,
  productsController.deleteProduct
);
router.put(
  "/:id",
  protect.protect,
  protect.admin,
  productsController.updateProduct
);

module.exports = router;
