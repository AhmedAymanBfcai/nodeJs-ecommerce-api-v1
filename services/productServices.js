const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Product = require("../models/productModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");

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
  // Build query
  const documentCounts = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort()
    .populate({ path: "category", select: "name -_id" });

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
