import Produto from "../Product/product.schema.js";
import cloudinary from "../../Config/cloudinary.config.js";

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
                resource_type: "auto"
            });

            // 3. Salva os dados retornados do Cloudinary
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

export default cadastrarProduto;