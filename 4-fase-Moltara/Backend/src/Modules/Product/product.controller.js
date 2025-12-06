import Produto from "../Product/product.schema.js";
import cloudinary from "../../Config/cloudinary.config.js";

//alguns import para barra de pesquisa
import { 
  createProduct, 
  updateProductInventory, 
  findProductsByTerm
} from './product.repository.js';

export const cadastrarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque } = req.body;

  const file = req.file;

  let imageUrl = null;
  let imagePublicId = null;

  try {
    if (file) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "produtos-api",
        resource_type: "auto",
      });

      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    }

    const novoProduto = new Produto({
      nome,
      preco,
      descricao,
      estoque,
      imagemUrl: imageUrl,
      imagemPublicId: imagePublicId,
    });

    await novoProduto.save();

    return res.status(201).json({
      nome: novoProduto.nome,
      preco: novoProduto.preco,
      descricao: novoProduto.descricao,
      imagemUrl: novoProduto.imagemUrl,
    });
  } catch (error) {
    console.error("Erro no cadastro do produto:", error);

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
    const produtos = await Produto.find({});
    return res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar o produto.",
    });
  }
};

export const getProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params; // Captura o ID da URL
    const produto = await Produto.findById(id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    return res.status(200).json(produto); // Retorna o objeto do produto
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Formato de ID inválido." });
    }

    return res.status(500).json({
      message: "Erro interno do servidor ao buscar o produto.",
    });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoDeletado = await Produto.findByIdAndDelete(id);
    if (!produtoDeletado) {
      return res
        .status(404)
        .json({ message: "Produto não encontrado para deleção." });
    }

    if (produtoDeletado.imagemPublicId) {
      try {
        await cloudinary.uploader.destroy(produtoDeletado.imagemPublicId);
        console.log(
          `Imagem ${produtoDeletado.imagemPublicId} removida do Cloudinary.`
        );
      } catch (cloudinaryError) {
        console.error("Erro ao deletar imagem no Cloudinary:", cloudinaryError);
      }
    }
    return res
      .status(200)
      .json({ message: "Produto deletado com sucesso!", id: id });
  } catch (error) {
    console.error("Erro ao deletar produto:", error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de produto inválido." });
    }

    return res.status(500).json({
      message: "Erro interno do servidor ao deletar o produto.",
    });
  }
};

//Barra de pesquisa ;)
/**
*@param {string} searchTerm 
*/
 
export const getSearchProducts = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim().length < 2) {
   throw { status: 400, message: 'O termo de busca deve ter pelo menos 2 caracteres.' };
  }
    
  const products = await findProductsByTerm(searchTerm.trim());
  return products;
};

export default cadastrarProduto;
