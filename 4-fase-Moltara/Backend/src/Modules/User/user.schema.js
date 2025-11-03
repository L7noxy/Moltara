// src/models/Order.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

  cpf: {
    type: String,
    required: true,
    minlength: 11,
    maxlenght: 11,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },


}, {
  timestamps: true
});

const ModeloUser = mongoose.model("User", userSchema);
export default ModeloUser;