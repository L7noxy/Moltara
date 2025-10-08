import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
  quantity:  {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  total: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
});

export default mongoose.model("Order", cartSchema);
