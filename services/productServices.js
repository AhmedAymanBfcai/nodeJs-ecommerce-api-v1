const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc      Get all products
// @route     GET /api/v1/products
// access     Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc      Create Product
// @route     POST /api/v1/products
// access     Private
exports.createProduct = factory.createOne(Product);

// @desc      Get product By Id
// @route     GET /api/v1/products/:id
// access     Public
exports.getProduct = factory.getOne(Product);

// @desc      Update Product By Id
// @route     PUT /api/v1/products/:id
// access     Private
exports.updateProduct = factory.updateOne(Product);

// @desc      Delete Product By Id
// @route     DELETE /api/v1/products/:id
// access     Private
exports.deleteProduct = factory.deleteOne(Product);
