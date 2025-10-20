import express from 'express';
import { productController } from '../Modules/Product/product.controller.js';

const router = express.Router();

router.post('/criar', productController);

export default router;