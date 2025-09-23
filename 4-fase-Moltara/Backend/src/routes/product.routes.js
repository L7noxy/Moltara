const express = require('express');
const router = express.Router();
const productController = require('../Modules/Product/product.controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => productController.getProduto(req, res));
router.post('/add', authMiddleware, (req, res) => productController.addProduto(req, res));
router.delete('/:productId', authMiddleware, (req, res) => productController.removeProduto(req, res));

module.exports = router;