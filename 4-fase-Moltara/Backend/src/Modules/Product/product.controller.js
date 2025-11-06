import Produto from '../Product/product.schema.js';

export const cadastrarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque, id } = req.body;

  try {
    const novoProduto = new Produto({
      nome,
      preco,
      descricao,

    });

    await novoProduto.save();

    return res.status(201).json({
      nome: novoProduto.nome,
      descricao: novoProduto.descricao,
      preco: novoProduto.preco,
      descricao: novoProduto.descricao,

    });

    console.log("Produto cadastrado com sucesso:", novoProduto);

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
    const produtos = await Produto.find();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar o produto.",
    });
  }
};


export default cadastrarProduto;