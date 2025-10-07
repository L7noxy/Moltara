const express = require('express');
const router = express.Router();
import { cadastrarUsuario } from "../controllers/user.controller.js";
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', authMiddleware, (req, res) => userController.getUsuario(req, res));
router.post('/cadastro', cadastrarUsuario);
router.delete('/:userId', authMiddleware, (req, res) => userController.removeUsuario(req, res));

export default router;