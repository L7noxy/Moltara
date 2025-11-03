import bcrypt from 'bcrypt';
import Usuario from '../User/user.schema.js';

const SALT_ROUNDS = 10;

export const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({
            message: "Todos os campos (nome, email, senha) são obrigatórios."
        });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ email });

        if (usuarioExistente) {
            return res.status(409).json({ message: "Este email já está cadastrado." });
        }
    } catch (dbError) {
        console.error("Erro ao verificar usuário existente:", dbError);
        return res.status(500).json({ message: "Erro interno do servidor ao verificar dados." });
    }

    try {
        const hashSenha = await bcrypt.hash(senha, SALT_ROUNDS);

        const novoUsuario = new Usuario({
            nome,
            email,
            senha: hashSenha,
        });

    } catch (error) {
        console.error("Erro na criação do usuário:", error);
        return res.status(500).json({
            message: "Erro interno do servidor ao tentar finalizar o cadastro."
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
            message: "Erro interno do servidor ao buscar usuários."
        });
    }
};

