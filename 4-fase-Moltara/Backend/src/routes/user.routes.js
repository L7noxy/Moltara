import express from 'express';
const router = express.Router();
import { cadastrarUsuario } from "../Modules/User/user.controller.js";
import { getUsuario } from "../Modules/User/user.controller.js";
import { login, me } from "../Modules/User/user.controller.js";

router.post('/cadastro', cadastrarUsuario);
router.get('/buscar', getUsuario);

// Rotas de autenticação

router.post('/register', register);
router.get('/login', login);
// router.post('/logout', logout);
router.get('/me', auth, me);

export default router;