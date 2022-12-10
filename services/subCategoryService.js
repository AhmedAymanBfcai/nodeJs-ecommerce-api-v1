const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ErrorApi = require("../utils/errorApi");
const SubCategory = require("../models/subCategoryModel");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  // TO apply Nested Routes.
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// @desc      Create Sub Category
// @route     POST /api/v1/subcategories
// access     Private
exports.createSubCategory = factory.createOne(SubCategory);

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

// @desc      Get all Subcategories
// @route     GET /api/v1/subcategories
// access     Public
exports.getSubCategories = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await SubCategory.countDocuments();

  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;

  res.status(200).json({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

// @desc      Get Subcategory By Id
// @route     GET /api/v1/subcategories/:id
// access     Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ErrorApi(`No subCategory for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: subCategory });
});

// @desc      Update SubCategory By Id
// @route     PUT /api/v1/subcategories/:id
// access     Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc      Delete SubCategory By Id
// @route     DELETE /api/v1/subcategories/:id
// access     Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
