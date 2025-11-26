import Order from "../models/Order.js"; 

const cartRepository = {};

cartRepository.findCartByUserId = async (userId) => {
  return await Order.findOne({ 
    user: userId, 
    status: "pending"
  })
  .populate("items.produto"); 
};

cartRepository.createCart = async (userId) => {
  const newCart = new Order({
    user: userId,
    items: [],
    total: 0,
    status: "pending"
  });
  
  return await newCart.save();
};

cartRepository.updateCart = async (cart) => {
  return await cart.save();
};

export default cartRepository;