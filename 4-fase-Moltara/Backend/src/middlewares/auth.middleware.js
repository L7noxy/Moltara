import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 
const JWT_SECRET = process.env.JWT_SECRET;

const auth= async (req, res, next) => {
 let token

 if(
 req.hearders.authorization && 
 req.hearders.authorization.startsWith('Bearer')
 ) {
    try{
     token= req.hearders.authorization.split('')[1]
     const decoded= jwt.verify(token, JWT_SECRET)
     req.user= await User.findById(decoded.id).select('-password')

     if(!req.user){
      return res.status(401).json({message: 'Usuário não encontrado'})
     }
     next()

    }catch(error){
     console.error('Erro de autentificação:', error)
     return res.status(401).json({message: 'Não autorizado, token falhou'})
            
    }
  }

  if (!token){
    return res.status(401).json({message: 'Não, autorizad, token não encontrado'})
  }

}

export {auth}