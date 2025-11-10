// Core imports
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const foodRoutes = require("./routes/food.routes");

// Initialize app
const app = express();

// Global middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

// Health check / root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
