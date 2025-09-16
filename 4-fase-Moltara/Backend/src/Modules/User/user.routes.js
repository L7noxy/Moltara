const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const authMiddleware = require('../../middlewares/authMiddleware');


router.get('/', authMiddleware, (req, res) => userController.getUsuario(req, res));
router.post('/add', authMiddleware, (req, res) => userController.addUsuario(req, res));
router.delete('/:userId', authMiddleware, (req, res) => userController.removeUsuario(req, res));

module.exports = router;