import cartService from "./cart.service.js";

export const cartController = {
  getCart: async (req, res) => {
    try {
      const produtoId = req.session.userId;
      const cart = await cartService.pegarCarrinho(produtoId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addItem: async (req, res) => {
    try {
      const { produtoId, quantidade } = req.body;
      const qtd = parseInt(quantidade, 10);
      const userId = req.session.userId;

      if (isNaN(qtd) || qtd <= 0) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      const updatedCart = await cartService.adicionarProduto(
        userId,
        produtoId,
        qtd
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.session.userId;

      const updatedCart = await cartService.removerProduto(userId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default cartController;
