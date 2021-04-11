const products = require("../../../data/products");

module.exports.getProducts = (req, res) => {
  return res.status(200).json(products);
};
module.exports.getProductsById = (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  return res.status(200).json(product);
};
