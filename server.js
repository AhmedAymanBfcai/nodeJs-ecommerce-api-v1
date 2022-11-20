const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const mongoose = require("mongoose");
const db = require("./config/db");
const errorApi = require("./utils/errorApi");
const globalError = require("./middlewares/errorMiddleware");
const categoryRoute = require("./routes/categoryRoute");

// Connect to db
db();

// Express app
const app = express();

// Middlewares - To use middleware you use 'app.use'
// Middleware must be before Routing
app.use(express.json()); // To convert string to JS Object.

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`You are on ${process.env.NODE_ENV} Mode :)`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.all("*", (req, res, next) => {
  next(new errorApi(`Can not fnd this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware.
app.use(globalError);

const PORT = process.env.PORT || 8000;

app.listen(PORT, (req, res) => {
  console.log(`Server is up on port ${PORT}`);
});
