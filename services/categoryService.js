const CategoryModel = require("../models/categoryModel");

exports.getCategories = (req, res) => {
  const name = req.body.name;
  console.log(name);

  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((error) => {
      res.json(error);
    });
};
