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

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ModeloUser = mongoose.model("User", userSchema);
module.exports = ModeloUser;