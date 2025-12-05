import Produto from "./product.schema.js";

const productRepository = {
  findById: async (id) => {
    return await Produto.findById(id);
  }
};

export default productRepository;