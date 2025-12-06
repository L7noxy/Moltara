import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produto",
        required: true
      },
      quantidade: {
        type: Number,
        default: 1,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    default: 0,
    required: true
  }
});

export default mongoose.model("Cart", CartSchema);
