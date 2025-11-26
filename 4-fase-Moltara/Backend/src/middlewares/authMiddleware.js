// Substitua "SEU_ID_DE_TESTE_AQUI" por um ID válido de algum usuário no seu MongoDB.
const USER_ID_DE_TESTE = "60a123b4c5d6e7f8g9h0i1j2"; // Exemplo de ObjectId

export const authMiddleware = (req, res, next) => {
  req.user = { 
    id: USER_ID_DE_TESTE 
  }; 
  console.log("AVISO: Usando ID de usuário fixo para testes.");
  next();
};