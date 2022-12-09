const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  // Unique prop does not work well, Check :)
  check("name")
    .notEmpty()
    .withMessage("Brand is required")
    .isLength({ min: 3 })
    .withMessage("Too short catgory nmae")
    .isLength({ max: 32 })
    .withMessage("Too long Brand name"),
  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id format"),
  validatorMiddleware,
];
