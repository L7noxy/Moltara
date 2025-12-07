import express from 'express';
const router = express.Router();
import { cadastrarProduto, getProduto, deletarProduto, getProdutoPorId, getSearchProducts } from '../Modules/Product/product.controller.js';
import upload from '../middlewares/multer.middleware.js';

router.post('/criar', upload.single('imageFile'), cadastrarProduto);
router.get('/buscar', getProduto);
router.get('/buscar/:id', getProdutoPorId);
router.delete('/deletar/:id', deletarProduto);
router.get('/pesquisa', getSearchProducts);

export default router;