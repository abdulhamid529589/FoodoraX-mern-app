const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const foodpartnermodel = mongoose.model("foodpartner", foodPartnerSchema);

module.exports = foodpartnermodel;
