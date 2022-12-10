const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @desc      Get all Brands
// @route     GET /api/v1/brands
// access     Public
exports.getBrands = factory.getAll(Brand);

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
