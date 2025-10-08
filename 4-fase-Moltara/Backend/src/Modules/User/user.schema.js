// src/models/Order.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  nome: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  senha: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ModeloUser = mongoose.model("User", userSchema);
export default ModeloUser;