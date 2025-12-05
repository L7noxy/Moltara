import bcrypt from "bcrypt";
import Usuario from "../User/user.schema.js";
import { Router } from "express";

const router = Router();
const SALT_ROUNDS = 10;

export const cadastrarUsuario = async (req, res) => {
  const { nome, cpf, email, senha } = req.body;

  try {
    const hashSenha = await bcrypt.hash(senha, SALT_ROUNDS);

    const novoUsuario = new Usuario({
      nome,
      cpf,
      email,
      senha: hashSenha,
      role: "user",
    });

    await novoUsuario.save();

    return res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    });
  } catch (error) {
    console.error("Erro no cadastro (salvamento/hash):", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "Erro interno do servidor ao tentar finalizar o cadastro.",
    });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({
      message: "Erro interno do servidor ao buscar usuários.",
    });
  }
};


// Login de usuario

export const login = async (req, res) => {
  const { email, senha } = req.body;

  const user = await Usuario.findOne({ email });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const match = await bcrypt.compare(senha, user.senha);
  if (!match) return res.status(400).json({ message: "Senha inválida" });

  // Criar sessão
  req.session.userId = user._id;

  res.status(200).json({ message: "Logado com sucesso" });
};

export const me = async (req, res) => {
  const user = await Usuario.findById(req.session.userId).select("-senha");
  res.json(user);
};

export const updateUsuario = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const updateData = {};
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;

    const user = await Usuario.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-senha");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const user = await Usuario.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Erro ao destruir sessão" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Usuário deletado com sucesso" });
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
};

// export const logout = (req, res) => {
//   req.session.destroy(() => {
//     res.clearCookie("connect.sid");
//     res.json({ message: "Deslogado" });
//   });
// };

export default router;
