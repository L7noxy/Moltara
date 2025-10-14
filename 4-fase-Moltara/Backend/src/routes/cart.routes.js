import express from 'express';
const router = express.Router();
import cartController from '../Modules/Cart/cart.controller.js';

router.post('/criar', cartController);

export default router;