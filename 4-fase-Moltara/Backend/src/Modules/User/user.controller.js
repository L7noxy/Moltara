// user.controller.js
const bcrypt = require('bcrypt');
const Usuario = require('../models/User'); 

const SALT_ROUNDS = 10;

exports.cadastrarUsuario = async (req, res) => {
    const { nome, cpf, email, senha } = req.body;
    if (!nome || !cpf || !email || !senha) {
        return res.status(400).json({ 
            message: "Todos os campos (nome, CPF, email, senha) são obrigatórios." 
        });
    }

    // 3. Validação de Email e CPF já cadastrados
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

    // --- Fim das Validações ---

    // 4. Criptografia da Senha (Segurança!)
    try {
        const hashSenha = await bcrypt.hash(senha, SALT_ROUNDS);

        // 5. Criação do Novo Usuário (Salvando no DB)
        const novoUsuario = new Usuario({
            nome,
            cpf,
            email,
            senha: hashSenha, // Salva o hash, NUNCA a senha pura
            // Adicione aqui outros campos como data de criação, etc.
        });

        const usuarioSalvo = await novoUsuario.save();

        // 6. Resposta de Sucesso
        // Retorna o novo ID e o nome, mas NUNCA a senha ou o hash.
        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            id: usuarioSalvo._id,
            nome: usuarioSalvo.nome,
        });

    } catch (error) {
        // 7. Tratamento de Erro ao salvar/criptografar
        console.error("Erro no cadastro:", error);
        return res.status(500).json({ 
            message: "Erro interno do servidor ao tentar finalizar o cadastro." 
        });
    }
};