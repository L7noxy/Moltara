import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do produto é obrigatório."],
      trim: true,
      maxlength: [500, "O nome não pode exceder 500 caracteres."],
    },
    
    descricao: {
      type: String,
      required: [true, "A descrição do produto é obrigatória."],
      maxlength: [5000, "A descrição não pode exceder 5000 caracteres."],
    },

    preco: {
      type: Number,
      required: [true, "O preço é obrigatório."],
      min: [0, "O preço não pode ser negativo."],
    },

    estoque: {
        type: Number,
        required: [true, 'A quantidade em estoque é obrigatória.'],
        min: 0,
        default: 10
    },

    imagemUrl: {
        type: String,
        default: 'https://placehold.co/400x400/D0D0D0/333333?text=Sem+Imagem'
    },
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model("Produto", productSchema);
export default Produto;