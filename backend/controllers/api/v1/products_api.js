const asyncHandler = require("express-async-handler");
const { findById } = require("../../../models/product");
const Product = require("../../../models/product");

module.exports.getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
  const keyword = req.query.keyword
    ? {
        name: { $regex: req.query.keyword, $options: "i" },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  return res
    .status(200)
    .json({ products, page, pages: Math.ceil(count / pageSize) });
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

module.exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    return res.json({ message: "Product Removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample/jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  return res.status(201).json(product);
});

module.exports.updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    await product.save();
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports.reviewProduct = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      return res.json({ message: "You have already reviewed the product" });
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => acc + item.rating, 0) /
      product.numReviews;
    await product.save();
    return res.status(201).json({ message: "Review successfully added!" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

module.exports.getTopProducts = asyncHandler(async (req, res) => {
  //sort asc
  const products = await Product.find({}).sort({ rating: -1 }).limit(4);
  res.json(products);
});
