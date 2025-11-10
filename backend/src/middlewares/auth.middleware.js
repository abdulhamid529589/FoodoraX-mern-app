const foodpartnermodel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authfoodPartnerMiddleware(req, res, next) {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodpartnermodel.findById(decoded._id);
    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Error" });
  }
}

module.exports = {
  authfoodPartnerMiddleware,
};
