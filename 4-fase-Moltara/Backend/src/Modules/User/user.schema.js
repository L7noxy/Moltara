// src/models/Order.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", userSchema);
