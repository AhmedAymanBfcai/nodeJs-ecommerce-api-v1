const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc      Create Product
// @route     POST /api/v1/products
// access     Private
exports.createProduct = factory.createOne(Product);

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

// @desc      Get product By Id
// @route     GET /api/v1/products/:id
// access     Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ErrorApi(`No product for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @desc      Update Product By Id
// @route     PUT /api/v1/products/:id
// access     Private
exports.updateProduct = factory.updateOne(Product);

// @desc      Delete Product By Id
// @route     DELETE /api/v1/products/:id
// access     Private
exports.deleteProduct = factory.deleteOne(Product);
