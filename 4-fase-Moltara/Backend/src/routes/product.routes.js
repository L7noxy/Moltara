import express from 'express';
const router = express.Router();
import { cadastrarProduto, getProduto, deletarProduto, getProdutoPorId } from '../Modules/Product/product.controller.js';
import upload from '../middlewares/multer.middleware.js';

router.post('/criar', upload.single('imageFile'), cadastrarProduto);
router.get('/buscar', getProduto);
router.get('/buscar/:id', getProdutoPorId);
router.delete('/deletar/:id', deletarProduto);

export default router;