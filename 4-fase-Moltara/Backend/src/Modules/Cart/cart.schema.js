import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  
  quantidade:  {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
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
