const authMiddleware = (req, res, next) => {

  req.user = { id: 'id_aleatorio' };  
  next(); 
};

export default authMiddleware;