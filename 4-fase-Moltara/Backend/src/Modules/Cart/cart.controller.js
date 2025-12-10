import cartService from "./cart.service.js";

export const cartController = {
  getCart: async (req, res) => {
    try {
      const userId = req.session?.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      const cart = await cartService.pegarCarrinho(userId);
      res.status(200).json(cart);

    } catch (error) {
      console.error("Erro em getCart:", error);
      res.status(500).json({ error: "Erro ao buscar carrinho" });
    }
  },

  addItem: async (req, res) => {
    try {

      console.log("BODY:", req.body);
      console.log("SESSION USER:", req.session?.userId);

      const { produtoId, quantidade, personalizacao } = req.body;
      const qtd = parseInt(quantidade, 10);
      const userId = req.session?.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!produtoId) {
        return res.status(400).json({ error: "Produto inválido" });
      }

      if (isNaN(qtd) || qtd <= 0) {
        return res.status(400).json({ error: "Quantidade inválida" });
      }

      const updatedCart = await cartService.adicionarProduto(
        userId,
        produtoId,
        qtd,
        personalizacao || {}
      );

      res.status(200).json(updatedCart);

    } catch (error) {
      console.error("Erro em addItem:", error);
      res.status(500).json({ error: "Erro ao adicionar item ao carrinho" });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.session?.userId;

      if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }

      if (!productId) {
        return res.status(400).json({ error: "ID do produto não informado" });
      }

      const updatedCart = await cartService.removerProduto(userId, productId);
      res.status(200).json(updatedCart);

    } catch (error) {
      console.error("Erro em removeItem:", error);
      res.status(500).json({ error: "Erro ao remover item do carrinho" });
    }
  }
};

export default cartController;
