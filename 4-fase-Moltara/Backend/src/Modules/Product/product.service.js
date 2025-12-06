import Produto from "../Product/product.schema.js";

//alguns import para barra de pesquisa
import { 
    findAllProducts,
    findProductById,
    createProduct, 
    updateProduct,
    deleteProduct,
    findProductsByTerm 
} from './product.repository.js';

export const findAllProducts = async () => {
    const products = await Produto.find().lean();
    return products;
};

export const findProductById = async (id) => {
    const product = await Produto.findById(id).lean();
    return product;
};

export const createProduct = async (productData) => {
    try {
        const newProduct = new Produto(productData);
        await newProduct.save();
        return newProduct;
    } catch (error) {
        throw new Error(`Falha ao criar produto: ${error.message}`);
    }
};

export const updateProduct = async (id, updateData) => {
    const updatedProduct = await Produto.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true } 
    ).lean();

    if (!updatedProduct) {
        throw new Error("Produto não encontrado para atualização.");
    }
    return updatedProduct;
};

export const deleteProduct = async (id) => {
    const deletedProduct = await Produto.findByIdAndDelete(id).lean();
    
    if (!deletedProduct) {
        throw new Error("Produto não encontrado para exclusão.");
    }
    return deletedProduct;
};

//Barra de pesquisa ;)
export const searchProducts = async (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length < 2) {
        throw { status: 400, message: 'O termo de busca deve ter pelo menos 2 caracteres.' };
    }
    
    // Chama a função do Repository
    const products = await findProductsByTerm(searchTerm.trim());

    return products;
};