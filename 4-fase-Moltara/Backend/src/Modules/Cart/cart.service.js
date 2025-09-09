const cartRepository = require("./cart.repository");
const productRepository = require("../product/product.repository");

exports.getCart = async (userId) => {
  const cart = await cartRepository.findCartByUserId(userId);
  return cart || (await cartRepository.createCart(userId));
};

exports.addItem = async (userId, productId, quantity) => {
  const cart = await this.getCart(userId);
  const product = await productRepository.findById(productId);

  if (!product) {
    throw new Error("Produto não encontrado.");
  }

  const existingItem = cart.items.find(
    (item) => item.productId.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  return await cartRepository.updateCart(cart);
};

exports.removeItem = async (userId, productId) => {
  const cart = await this.getCart(userId);

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== productId
  );

  return await cartRepository.updateCart(cart);
};
