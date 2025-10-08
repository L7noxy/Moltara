import express  from 'express';
const router = express.Router();
import productController from '../Modules/Product/product.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

router.get('/', authMiddleware, (req, res) => productController.getProduto(req, res));
router.post('/add', authMiddleware, (req, res) => productController.addProduto(req, res));
router.delete('/:productId', authMiddleware, (req, res) => productController.removeProduto(req, res));

export default router;