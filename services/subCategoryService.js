const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

// Nested Route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested Route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc      Create Sub Category
// @route     POST /api/v1/subcategories
// access     Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc      Get Subcategory By Id
// @route     GET /api/v1/subcategories/:id
// access     Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc      Get all Subcategories
// @route     GET /api/v1/subcategories
// access     Public
exports.getSubCategories = factory.getAll(SubCategory);

// @desc      Update SubCategory By Id
// @route     PUT /api/v1/subcategories/:id
// access     Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc      Delete SubCategory By Id
// @route     DELETE /api/v1/subcategories/:id
// access     Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
