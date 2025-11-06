import Produto from '../Product/product.schema.js';

export const cadastrarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque, id } = req.body;

  try {
    const novoProduto = new Produto({
      nome,
      descricao,
      preco,
      // estoque
    });

    await novoProduto.save();

    return res.status(201).json({
      nome: novoProduto.nome,
      descricao: novoProduto.descricao,
      preco: novoProduto.preco,
      // estoque: novoProduto.estoque
    });
  } catch (error) {
    console.error("Erro no cadastro do produto", error);

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
    const Produtos = await novoProduto.find();
    return res.status(200).json(Produtos);
  } catch (error) {
    console.error("Erro ao buscar os produtos:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar usuários.",
    });
  }
};


export default cadastrarProduto;