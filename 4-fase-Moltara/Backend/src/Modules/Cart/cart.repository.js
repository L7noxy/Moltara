import Cart from "./cart.schema.js";
const cartRepository = {};

cartRepository.findCartByUserId = async (userId) => {
  return await Cart.findOne({ user: userId }).populate("items.produto");
};

cartRepository.createCart = async (userId) => {
  const newCart = new Cart({
    user: userId,
    items: [],
    total: 0
  });
  return await newCart.save();
};

cartRepository.updateCart = async (cart) => {
  return await cart.save();
};

export default cartRepository;
