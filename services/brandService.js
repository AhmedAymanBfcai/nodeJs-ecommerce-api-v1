const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const brandModel = require("../models/brandModel");
const ErrorApi = require("../utils/errorApi");

// @desc      Get all Brands
// @route     GET /api/v1/brands
// access     Public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1; // *1 to convert the output to string.
  const limit = req.query.limit * 5 || 5;
  const skip = (page - 1) * limit;

  const brands = await brandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
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
