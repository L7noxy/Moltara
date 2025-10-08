import Produto from "../Product/product.schema.js";

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
