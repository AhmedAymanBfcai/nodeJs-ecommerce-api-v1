const mongoose = require("mongoose");

// 1- Create Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [3, "Too short product title"],
    maxlength: [100, "Too long product title"],
  },
  slug: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required!"],
    minlength: [20, "Too short prodcut description"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required!"],
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    trim: true,
    max: [200000, "The price you entered is very high."],
  },
  priceAfterDiscount: {
    type: Number,
  },
  colors: [String],
  imageCover: {
    type: String,
    required: [true, "You must provide a cover photo"],
  },
  images: [String],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Product must belong to a category"],
  },
  subcategory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
  ],
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "Brand",
  },
  ratingAvg: {
    type: Number,
    min: [1, "Rating must be above or equal to 1.0 :)"],
    max: [5, "Rating must be below or equal to 5.0 :)"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
});

// 2- Create model
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
