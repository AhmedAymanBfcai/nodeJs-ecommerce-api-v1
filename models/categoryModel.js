const mongoose = require("mongoose");

// 1- Create Schema
const categorySchema = new mongoose.Schema({
  name: String,
});

// 2- Create model
const categoryModel = mongoose.model("collectionname", categorySchema);

module.exports = categoryModel;
