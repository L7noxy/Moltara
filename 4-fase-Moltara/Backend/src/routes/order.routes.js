import express from 'express';
const router = express.Router();

import { 
    finalizarCheckout, 
    receberCallbackMaquina 
} from '../Modules/Order/order.controller.js';
// Importe o middleware de autenticação (se necessário)
// import { protect } from '../middlewares/auth.middleware.js'; 

// Rota para o Frontend iniciar o pedido
// Deve ser protegida por autenticação
// router.post('/checkout', protect, finalizarCheckout); 
router.post('/checkout', finalizarCheckout); // Usando sem o protect por enquanto
router.post('/callback', receberCallbackMaquina);

export default router;