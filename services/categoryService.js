const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Category = require("../models/categoryModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc      Get all categories
// @route     GET /api/v1/categories
// access     Public
exports.getCategories = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Category.countDocuments();

  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();
  // .populate({ path: "category", select: "name -_id" });

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;

  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});

// @desc      Create Category
// @route     POST /api/v1/categories
// access     Private
exports.createCategory = factory.createOne(Category);

// @desc      Get category By Id
// @route     GET /api/v1/categories/:id
// access     Public
exports.getCategory = factory.getOne(Category);

// @desc      Update Category By Id
// @route     PUT /api/v1/categories/:id
// access     Private
exports.updateCategory = factory.updateOne(Category);

// @desc      Delete Category By Id
// @route     DELETE /api/v1/categories/:id
// access     Private
exports.deleteCategory = factory.deleteOne(Category);
