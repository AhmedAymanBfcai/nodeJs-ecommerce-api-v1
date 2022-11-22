const express = require("express");
const { param, validationResult } = require("express-validator");

const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router
  .route("/:id")
  .get(
    // Ruels
    param("id").isMongoId().withMessage("Invalid category Id"),
    // catch errors in Rules if exist
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    },
    getCategory
  )
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
