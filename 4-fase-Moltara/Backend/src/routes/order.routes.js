import express from 'express';
const router = express.Router();

import { 
    finalizarCheckout, 
    receberCallbackMaquina 
} from '../Modules/Order/order.controller.js';

import { auth } from '../middlewares/auth.middleware.js';
 
router.post('/checkout', auth, finalizarCheckout); 
router.post('/callback', receberCallbackMaquina);

export default router;