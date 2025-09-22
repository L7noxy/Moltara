const express = require('express');
const router = express.Router();
const cartController = require('./cart.controller');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/', authMiddleware, (req, res) => cartController.getCart(req, res));
router.post('/add', authMiddleware, (req, res) => cartController.addItem(req, res));
router.delete('/:productId', authMiddleware, (req, res) => cartController.removeItem(req, res));

module.exports = router;