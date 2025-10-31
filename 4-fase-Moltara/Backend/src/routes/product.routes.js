import express from 'express';
const router = express.Router();
import { cadastrarProduto, getProduto } from '../Modules/Product/product.controller.js';



router.post('/criar', cadastrarProduto);
router.get('/buscar', getProduto);

export default router;