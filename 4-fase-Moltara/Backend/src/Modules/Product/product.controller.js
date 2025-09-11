const productService = require("./product.service");

exports.getCart = async (req, res) => {
  try {
    const productId = req.user.id; 
    const product = await productService.getProduct(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

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
