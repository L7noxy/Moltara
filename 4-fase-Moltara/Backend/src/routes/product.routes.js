import express from 'express';
const router = express.Router();
import { productController } from '../Modules/Product/product.controller.js';

router.post('/criar', productController.createProduct);

export default router;