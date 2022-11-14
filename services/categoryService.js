const CategoryModel = require("../models/categoryModel");
const slugify = require("slugify");

exports.getCategories = (req, res) => {};

exports.createCategory = (req, res) => {
  const name = req.body.name;
  console.log(req.body);

  CategoryModel.create({ name, slug: slugify(name) })
    .then((category) => res.status(201).json({ data: category }))
    .catch((error) => res.status(400).send(error));
};
