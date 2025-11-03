import Produto from '../Product/product.schema.js';

export const productController = async (req, res) => {
    const { nome_produto, descricao, preco } = req.body;
    if (!nome_produto || !descricao || !preco) {
        return res.status(400).json({
            message: "Todos os campos (nome, descrição, preço) são obrigatórios."
        });
    }

    try {
        const produtoExistente = await Produto.findOne({ nome_produto: nome });

        if (produtoExistente) {
            return res.status(409).json({ message: "Este produto já está cadastrado." });
        }
    } catch (dbError) {
        console.error("Erro ao verificar produto existente:", dbError);
        return res.status(500).json({ message: "Erro interno do servidor ao verificar dados." });
    }
    try {
        const novoProduto = new Produto({
            nome_produto,
            descricao,
            preco,
        });

    } catch (error) {
        console.error("Erro no cadastro:", error);
        return res.status(500).json({
            message: "Erro interno do servidor ao tentar finalizar o cadastro."
        });
    }
};

export default productController;