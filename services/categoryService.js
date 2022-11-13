const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");

exports.getCategories = (req, res) => {
  res.send();
};

exports.createCategory = (req, res) => {
  const name = req.body.name;
  console.log(req.body);
  // const name = "Computers";

  CategoryModel.create({ name })
    .then((category) => res.status(201).json({ data: category }))
    .catch((error) => res.status(400).send(error));
};
