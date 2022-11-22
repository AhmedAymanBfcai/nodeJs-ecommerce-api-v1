const mongoose = require("mongoose");

const db = () => {
  mongoose.connect(process.env.DB_URI).then((connection) => {
    console.log(`Database connected successfully :) `);
  });
};

module.exports = db;
