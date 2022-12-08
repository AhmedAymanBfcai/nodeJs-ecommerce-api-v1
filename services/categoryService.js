const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const CategoryModel = require("../models/categoryModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");

// @desc      Create Category
// @route     POST /api/v1/categories
// access     Private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc      Get all categories
// @route     GET /api/v1/categories
// access     Public
exports.getCategories = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await CategoryModel.countDocuments();

  const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
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

// @desc      Get category By Id
// @route     GET /api/v1/categories/:id
// access     Public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ErrorApi(`No category for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

// @desc      Update Category By Id
// @route     PUT /api/v1/categories/:id
// access     Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    return next(new ErrorApi(`No category for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

// @desc      Delete Category By Id
// @route     DELETE /api/v1/categories/:id
// access     Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ErrorApi(`No category for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: category });
});
