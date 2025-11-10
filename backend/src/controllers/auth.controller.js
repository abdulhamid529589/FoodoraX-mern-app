const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodpartnermodel = require("../models/foodpartner.model");

async function registerUser(req, res) {
  const { fullName, email, password } = req.body;

  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

function logOutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  const { name, email, password } = req.body;

  const isfoodPartnerExists = await foodpartnermodel.findOne({ email });
  if (isfoodPartnerExists) {
    return res.status(400).json({ message: "Food foodPartner already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newfoodPartner = await foodpartnermodel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: newfoodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(201).json({
    message: "Food foodPartner registered successfully",
    foodPartner: {
      _id: newfoodPartner._id,
      name: newfoodPartner.name,
      email: newfoodPartner.email,
    },
  });
}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;

  const foodPartner = await foodpartnermodel.findOne({
    email,
  });

  if (!foodPartner) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign({ _id: foodPartner._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    message: "Food foodPartner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

function logOutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  registerFoodPartner,
  loginFoodPartner,
  logOutFoodPartner,
};
