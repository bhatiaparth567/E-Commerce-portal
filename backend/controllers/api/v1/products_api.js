const asyncHandler = require("express-async-handler");
const Product = require("../../../models/product");

module.exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json(products);
});
module.exports.getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
