const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");

const app = express();

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
