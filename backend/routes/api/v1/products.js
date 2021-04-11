const express = require("express");
const router = express.Router();

const productsController = require("../../../controllers/api/v1/products_api");

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProductsById);

module.exports = router;
