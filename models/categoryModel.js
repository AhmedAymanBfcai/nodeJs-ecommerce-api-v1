const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is required!"],
      unique: true, // Catching error here is not working well; name of category can be repeated, Check :)
      minlength: [3, "Too short category name"],
      maxlength: [32, "To long category name"],
      trim: true,
    },
    // A and B => ex: shopping.com/a-and-b => sulg converts any space with - and any upper case to lower.
    slug: {
      type: String,
      lowercase: true,
      slug: "title",
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

// 2- Create model
const categoryModel = mongoose.model("collectionname", categorySchema);

module.exports = categoryModel;
