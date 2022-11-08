const mongoose = require('mongoose');

const db = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((connection) => {
      console.log(`Database connected successfully :) `);
    })
    .catch((error) => {
      console.error(`Database connection error: ${error}`);
      process.exit(1);
    });
};

module.exports = db;
