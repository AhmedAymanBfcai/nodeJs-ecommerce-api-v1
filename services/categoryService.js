const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

// @desc      Create Category
// @route     POST /api/v1/categories
// access     Private
exports.createCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;

  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc      Get all categories
// @route     GET /api/v1/categories
// access     Public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // *1 to convert the output to string.
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;

  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc      Get category By Id
// @route     GET /api/v1/categories/:id
// access     Public
exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: "No category for this id" });
  }

  res.status(200).json({ data: category });
});

// @desc      Update Category By Id
// @route     PUT /api/v1/categories/:id
// access     Private
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!category) {
    res.status(404).json({ msg: "No category for this id" });
  }

  res.status(200).json({ data: category });
});

// @desc      Delete Category By Id
// @route     DELETE /api/v1/categories/:id
// access     Private
exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    res.status(404).json({ msg: "No category for this id" });
  }

  res.status(200).json({ data: category });
});