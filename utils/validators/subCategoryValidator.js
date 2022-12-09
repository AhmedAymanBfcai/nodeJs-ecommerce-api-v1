const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  // Unique prop does not work well, Check :)
  check("name")
    .notEmpty()
    .withMessage("SubCategory is required")
    .isLength({ min: 2 })
    .withMessage("Too short SubCategory nmae")
    .isLength({ max: 32 })
    .withMessage("Too long SubCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must belong to a Category")
    .isMongoId()
    .withMessage("Invalid Category Id format"),
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format"),
  body("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory Id format"),
  validatorMiddleware,
];
