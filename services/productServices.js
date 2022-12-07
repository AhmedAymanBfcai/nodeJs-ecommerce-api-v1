const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const ErrorApi = require("../utils/errorApi");

// @desc      Create Product
// @route     POST /api/v1/products
// access     Private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);

  const product = await Product.create(req.body);
  res.status(201).json({ data: product });
});

// @desc      Get all products
// @route     GET /api/v1/products
// access     Public
exports.getProducts = asyncHandler(async (req, res) => {
  // 1) Filtering
  const queryStringObj = { ...req.query };
  const excludesFileds = ["page", "sort", "limit", "fileds"];
  excludesFileds.forEach((field) => delete queryStringObj[field]);

  // Apply filteration using [gte, gt, lte, lt]
  let queryStr = JSON.stringify(queryStringObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // 2) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;

  // Build query
  const mongooseQuery = Product.find(queryStringObj).skip(skip).limit(limit);
  // .populate({ path: "category", select: "name -_id" });

  // Execue query
  const products = await mongooseQuery; // To chain any number of methods you may need:)

  res.status(200).json({ results: products.length, page, data: products });
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
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);

  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true, // Return the product after you update it.
  });

  if (!product) {
    return next(new ErrorApi(`No product for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @desc      Delete Product By Id
// @route     DELETE /api/v1/products/:id
// access     Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorApi(`No product for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: product });
});
