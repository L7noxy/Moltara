import Product from "./product.model";

export const findProductsByTerm = async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i');

    return await Product.find({
        $or: [
            { nome: { $regex: regex } },
            { descricao: { $regex: regex } } 
        ]
    }).select('-__v');
};