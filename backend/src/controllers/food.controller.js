const foodModel = require("../models/fooditems.model");

async function createFood(req, res) {
  res.send({ message: "Food item created successfully" });
}

module.exports = {
  createFood,
};
