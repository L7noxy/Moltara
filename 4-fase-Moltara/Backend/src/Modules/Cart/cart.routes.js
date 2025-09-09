// src/modules/cart/cart.routes.js
const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const authMiddleware = require('../../middlewares/authMiddleware'); // Exemplo de middleware de autenticação

router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addItem);
router.delete('/:productId', authMiddleware, cartController.removeItem);

module.exports = router;