const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

// @desc      Get all categories
// @route     GET /api/v1/categories
// access     Public
exports.getCategories = factory.getAll(Category);

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
