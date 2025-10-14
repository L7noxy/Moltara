import bcrypt from 'bcrypt';
import Usuario from '../User/user.schema.js';

const SALT_ROUNDS = 10;

export const cadastrarUsuario = async (req, res) => {
    const { nome, cpf, email, senha } = req.body;
    if (!nome || !cpf || !email || !senha) {
        return res.status(400).json({
            message: "Todos os campos (nome, CPF, email, senha) são obrigatórios."
        });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { cpf }] });

        if (usuarioExistente) {
            if (usuarioExistente.email === email) {
                return res.status(409).json({ message: "Este e-mail já está cadastrado." });
            }
            if (usuarioExistente.cpf === cpf) {
                return res.status(409).json({ message: "Este CPF já está cadastrado." });
            }
        }
    } catch (dbError) {
        console.error("Erro ao verificar usuário existente:", dbError);
        return res.status(500).json({ message: "Erro interno do servidor ao verificar dados." });
    }

    try {
        const hashSenha = await bcrypt.hash(senha, SALT_ROUNDS);

        const novoUsuario = new Usuario({
            nome,
            cpf,
            email,
            senha: hashSenha,
        });

        const usuarioSalvo = await novoUsuario.save();

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            id: usuarioSalvo._id,
            nome: usuarioSalvo.nome,
        });

    } catch (error) {
        console.error("Erro no cadastro:", error);
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

