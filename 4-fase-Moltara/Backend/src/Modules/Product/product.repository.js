import Product from "./product.schema.js";

const findById = async (id) => {
    return await Product.findById(id).select('-__v'); 
};

export const findProductsByTerm = async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i');

    return await Product.find({
        $or: [
            { nome: { $regex: regex } },
            { descricao: { $regex: regex } } 
        ]
    }).select('-__v');
};

export const productRepository = {
    findById,
    findProductsByTerm,  
};