const mongoose = require("mongoose");

// 1- Create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand is required!"],
      unique: [true, "Brand must be unique!"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
      trim: true,
    },
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
const brandModel = mongoose.model("Br", brandSchema);

module.exports = brandModel;
