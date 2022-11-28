const express = require("express");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const morgan = require("morgan");

const ErrorApi = require("./utils/errorApi");
const globalError = require("./middlewares/errorMiddleware");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");

// Connect to db
const db = require("./config/db");

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
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);

app.all("*", (req, res, next) => {
  next(new ErrorApi(`Can not fnd this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for Express.
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, (req, res) => {
  console.log(`Server is up on port ${PORT}`);
});

// Handling rejections from outside Express.
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}}`);
  // Close server first before exit our app as maybe there some pending requests.
  server.close(() => {
    console.log("Shutting down..");
    process.exit(1);
  });
});
