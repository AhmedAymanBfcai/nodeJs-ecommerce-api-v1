const mongoose = require("mongoose");

// 1- Create Schema
const subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required!"],
      unique: [true, "Subcategory must be unique!"], // Catching error here is not working well; name of category can be repeated, Check :)
      minlength: [2, "Too short category name"],
      maxlength: [32, "Too long category name"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      slug: "title",
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "categoryModel",
      required: [true, "SubCategory must be belong to a parent category."],
    },
  },
  {
    timestamps: true,
  }
);

// 2- Create model
const categoryModel = mongoose.model("SubCategory", subcategorySchema);

module.exports = categoryModel;
