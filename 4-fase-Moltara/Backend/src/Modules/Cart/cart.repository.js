const Cart = require('./cart.schema');

exports.findCartByUserId = async (userId) => {
  return await Cart.findOne({ userId }).populate('items.productId');
};

exports.updateCart = async (cart) => {
  return await cart.save();
};

exports.createCart = async (userId) => {
  const newCart = new Cart({ userId, items: [] });
  return await newCart.save();
};