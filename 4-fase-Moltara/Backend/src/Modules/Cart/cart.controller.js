// src/modules/cart/cart.controller.js
const cartService = require("./cart.service");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id; // Supondo que você obtém o ID do usuário do token de autenticação
    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id; // Supondo que você obtém o ID do usuário do token de autenticação

    const updatedCart = await cartService.addItem(userId, productId, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const updatedCart = await cartService.removeItem(userId, productId);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
