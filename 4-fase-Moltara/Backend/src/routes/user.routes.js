import express from 'express';
const router = express.Router();
import { cadastrarUsuario } from "../Modules/User/user.controller.js";
import { getUsuario } from "../Modules/User/user.controller.js";

router.post('/cadastro', cadastrarUsuario);
router.get('/buscar', getUsuario);

export default router;