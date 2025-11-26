import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do produto é obrigatório."],
      trim: true,
      maxlength: [100, "O nome não pode exceder 100 caracteres."],
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
        default: 0
    },

    imagemUrl: {
        type: String,
        default: 'https://placehold.co/400x400/D0D0D0/333333?text=Sem+Imagem'
    },
    
    // categoria: {
    //     type: String,
    //     trim: true,
    //     default: 'Geral'
    // }
  },
  {
    timestamps: true,
  }
);

const Produto = mongoose.model("Produto", productSchema);
export default Produto;