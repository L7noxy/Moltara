import Cart from './cart.schema.js';
const cartRepository = {};

cartRepository.findCartByUserId = async (userId) => {
  return await Cart.findOne({ userId }).populate('items.productId');
};

cartRepository.updateCart = async (cart) => {
  return await cart.save();
};

cartRepository.createCart = async (userId) => {
  const newCart = new Cart({ userId, items: [] });
  return await newCart.save();
};

export default cartRepository;