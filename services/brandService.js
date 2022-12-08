const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const brandModel = require("../models/brandModel");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");

// @desc      Get all Brands
// @route     GET /api/v1/brands
// access     Public
exports.getBrands = asyncHandler(async (req, res) => {
  // Build query
  const documentCounts = await brandModel.countDocuments();

  const apiFeatures = new ApiFeatures(brandModel.find(), req.query)
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

// @desc      Create Brand
// @route     POST /api/v1/brands
// access     Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc      Get Brand By Id
// @route     GET /api/v1/brands/:id
// access     Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ErrorApi(`No category for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @desc      Update Brand By Id
// @route     PUT /api/v1/brands/:id
// access     Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await brandModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );

  if (!brand) {
    return next(new ErrorApi(`No Brand for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @desc      Delete Brand By Id
// @route     DELETE /api/v1/brands/:id
// access     Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findByIdAndDelete(id);

  if (!brand) {
    return next(new ErrorApi(`No Brand for this Id: ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});
