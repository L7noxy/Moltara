import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    produtoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Produto",
      required: true,
    },
    texto: {
      type: String,
      required: [true, "O comentário não pode ser vazio."],
      trim: true,
      maxlength: [500, "O comentário não pode exceder 500 caracteres."],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
