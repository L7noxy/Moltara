import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";

import Usuario from "../Modules/User/user.schema.js"; // <-- FALTAVA IMPORTAR O MODEL

import { cadastrarUsuario } from "../Modules/User/user.controller.js";
import { getUsuario } from "../Modules/User/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { me } from "../Modules/User/user.controller.js";

router.post("/cadastro", cadastrarUsuario);
router.get("/buscar", getUsuario);
router.get("/me", auth, me);

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = await Usuario.findOne({ email }).select("+senha");

    if (!user) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Email ou senha inválidos" });
    }

    // CRIA A SESSÃO
    req.session.userId = user._id;
    req.session.role = user.role;

    res.json({
      message: "Login realizado com sucesso",
      role: user.role,
      nome: user.nome,
      email: user.email, 
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;
