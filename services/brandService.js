const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const Brand = require("../models/brandModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");
const factory = require("./handlersFactory");

// @desc      Get all Brands
// @route     GET /api/v1/brands
// access     Public
exports.getBrands = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await Brand.countDocuments();

  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // Execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;

  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @desc      Get Brand B y Id
// @route     GET /api/v1/brands/:id
// access     Public
exports.getBrand = factory.getOne(Brand);

// @desc      Create Brand
// @route     POST /api/v1/brands
// access     Private
exports.createBrand = factory.createOne(Brand);

// @desc      Update Brand By Id
// @route     PUT /api/v1/brands/:id
// access     Private
exports.updateBrand = factory.updateOne(Brand);

// @desc      Delete Brand By Id
// @route     DELETE /api/v1/brands/:id
// access     Private
exports.deleteBrand = factory.deleteOne(Brand);
