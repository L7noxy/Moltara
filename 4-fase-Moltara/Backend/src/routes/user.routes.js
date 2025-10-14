import express from 'express';
const router = express.Router();
import { userController, cadastrarUsuario, getUsuario } from "../Modules/User/user.controller.js";

router.use('/user', userController);
router.get('/', (req, res) => getUsuario(req, res));
router.post('/cadastro', cadastrarUsuario);

export default router;