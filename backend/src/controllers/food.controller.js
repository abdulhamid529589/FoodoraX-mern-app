const foodModel = require("../models/fooditems.model");
const storageService = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

async function createFood(req, res) {
  try {
    // Check if a file was uploaded
    let fileUploadResult = null;
    if (req.file) {
      fileUploadResult = await storageService.uploadFile(
        req.file.buffer,
        uuidv4()
      );
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodpartner: req.foodPartner._id,
    });

    res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    res.status(500).json({ error: "Failed to create food item" });
  }
}

async function getAllFoods(req, res) {
  const fooditems = await foodModel.find({});
  res.status(200).json({ foods: fooditems });
}

module.exports = {
  createFood,
  getAllFoods,
};
