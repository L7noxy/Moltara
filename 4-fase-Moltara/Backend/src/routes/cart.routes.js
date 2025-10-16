import express from 'express';
import { cartController } from '../Modules/Cart/cart.controller.js'; 
const router = express.Router();

router.post('/criar', cartController);

export default router;