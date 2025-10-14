import {
    createProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
} from "./product.service.js";

export const productController = async (req, res) => {

    const create = async (req, res) => {
        try {
            const newProduct = await createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    const findAll = async (req, res) => {
        try {
            const products = await findAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar a lista de produtos." });
        }
    }

    const findById = async (req, res) => {
        try {
            const product = await findProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: "Produto não encontrado." });
            }
            res.status(200).json(product);
        } catch (error) {
            // 500 para erros de servidor ou 400 se o ID for inválido
            res.status(500).json({ error: "Erro ao buscar produto." });
        }
    }

    const update = async (req, res) => {
        try {
            const updatedProduct = await updateProduct(req.params.id, req.body);
            res.status(200).json(updatedProduct);
        } catch (error) {
            // 404 se não encontrar, 400 se a validação falhar
            const status = error.message.includes("não encontrado") ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }

    const deletar = async (req, res) => {
        try {
            await deleteProduct(req.params.id);
            res.status(204).send(); // 204 No Content para exclusão bem-sucedida
        } catch (error) {
            const status = error.message.includes("não encontrado") ? 404 : 400;
            res.status(status).json({ error: error.message });
        }
    }
};

export default productController;
