import bcrypt from "bcrypt";
import Usuario from "../User/user.schema.js";

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
    });

    await novoUsuario.save();

    return res.status(201).json({
      id: novoUsuario._id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
      // etc.
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
