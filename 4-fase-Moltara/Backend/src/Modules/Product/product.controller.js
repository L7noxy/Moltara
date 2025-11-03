import bcrypt from "bcrypt";
import Produto from "../Product/product.schema.js";

export const cadastrarProduto = async (req, res) => {
  const { nome, descricao, preco } = req.body;

  try {
    const hashSenha = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoProduto = new Usuario({
      nome,
      descricao,
      preco,
    });

    await novoProduto.save();

    return res.status(201).json({
      id: novoProduto._id,
      nome: novoProduto.nome,
      preco: novoProduto.preco,
    });
  } catch (error) {
    console.error("Erro no cadastro", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Erro interno do servidor ao tentar finalizar o cadastro.",
    });
  }
};

export const getProduto = async (req, res) => {
  try {
    const Produto = await Produto.find();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar usuários.",
    });
  }
};


export default cadastrarProduto;
