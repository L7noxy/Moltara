import cartService from "./cart.service.js";

export const cartController = async (req, res) => {
  const getCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const addItem = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const userId = req.user.id;

      const updatedCart = await cartService.addItem(
        userId,
        productId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const removeItem = async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.id;

      const updatedCart = await cartService.removeItem(userId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

export default cartController;
