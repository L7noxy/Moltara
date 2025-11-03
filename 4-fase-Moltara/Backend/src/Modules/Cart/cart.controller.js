import cartService from "./cart.service.js";

export const cartController = {
  getCart: async (req, res) => {
    try {
      const produtoId = req.produto;
      const cart = await cartService.pegarCarrinho(produtoId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addItem: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      const updatedCart = await cartService.adicionarProduto(
        userId,
        productId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;

      const updatedCart = await cartService.removerProduto(userId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default cartController;
