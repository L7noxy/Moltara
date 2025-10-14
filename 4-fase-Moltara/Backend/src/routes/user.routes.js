import express from 'express';
const router = express.Router();
import { cadastrarUsuario } from "../Modules/User/user.controller.js";

router.post('/cadastro', cadastrarUsuario);

export default router;