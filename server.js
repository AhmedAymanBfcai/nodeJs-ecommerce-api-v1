const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Connect with db
mongoose
  .connect(process.env.DB_URI)
  .then((connection) => {
    console.log(
      `Database connected successfully: ${connection.connection.host}`
    );
  })
  .catch((error) => {
    console.error(`Database connection error: ${error}`);
    process.exit(1);
  });

// Middleware must be before Routing
// To use middleware you use 'app.use'
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`You are on ${process.env.NODE_ENV} Mode :)`);
}

app.get("/", (req, res) => {
  res.send(" Hi from ServerJs :) ");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server is up on port ${PORT}`);
});
