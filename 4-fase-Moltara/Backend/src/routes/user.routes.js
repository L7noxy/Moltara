import express from 'express';
const router = express.Router();
import { cadastrarUsuario } from "../Modules/User/user.controller.js";
import authMiddleware from '../middlewares/authMiddleware.js';


router.get('/', authMiddleware, (req, res) => userController.getUsuario(req, res));
router.post('/cadastro', cadastrarUsuario);
router.delete('/:userId', authMiddleware, (req, res) => userController.removeUsuario(req, res));

export default router;