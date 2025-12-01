import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import { cadastrarUsuario } from "../Modules/User/user.controller.js";
import { getUsuario } from "../Modules/User/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { me } from "../Modules/User/user.controller.js";

router.post("/cadastro", cadastrarUsuario);
router.get("/buscar", getUsuario);

// Rotas de autenticação


// router.post('/logout', logout);
router.get("/me", auth, me);

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "Email ou senha inválidos" });
  }

  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    return res.status(400).json({ error: "Email ou senha inválidos" });
  }

  req.session.userId = user._id;
  req.session.role = user.role;

  res.json({
    message: "Login realizado com sucesso",
    role: user.role,
  });
});

export default router;
