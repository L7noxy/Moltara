// src/middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
  // Por enquanto, vamos supor que o usuário está autenticado
  // Em uma implementação real, aqui você validaria o token do usuário
  req.user = { id: '65d9e8c3a9f0e8a7c2c9d7d4' }; // Adiciona o ID de usuário à requisição
  next(); // Chama o próximo middleware/controlador
};

module.exports = authMiddleware;