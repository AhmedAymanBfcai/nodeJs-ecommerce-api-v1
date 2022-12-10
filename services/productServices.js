const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc      Get all products
// @route     GET /api/v1/products
// access     Public
exports.getProducts = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search("Products")
    .limitFields()
    .sort();
  // .populate({ path: "category", select: "name -_id" });

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

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
