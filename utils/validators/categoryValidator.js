const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category Id format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  // Unique prop does not work well, Check :)
  check("name")
    .notEmpty()
    .withMessage("Category is required")
    .isLength({ min: 3 })
    .withMessage("Too short catgory nmae")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category Id format"),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category Id format"),
  validatorMiddleware,
];
