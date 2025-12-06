import mongoose from "mongoose";

const produtoSchema = mongoose.Schema({
 nome:{
  type: String,
  required: true,
 },

 preco:{
 type: Number,
 required: true,
 },

 imagemUrl:{
 type: String,
 },

 imagemUrl: {
 type: String,
 },
   
    
 estoque: {
 type: Number,
 required: true,
 default: 0
 }

 }, {
  timestamps: true,
})

const Produto = mongoose.model('Product', produtoSchema);

export default Produto;