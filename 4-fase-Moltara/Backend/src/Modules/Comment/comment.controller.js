import mongoose from "mongoose";
import Comment from "./comment.schema.js";

export const criarComentario = async (req, res) => {
  try {
    const { produtoId, texto } = req.body;
    const userId = req.session.userId;

    // 1. VERIFICAÇÃO DE LOGIN
    if (!userId) {
      return res.status(401).json({ message: "Você precisa estar logado para comentar." });
    }

    // 2. VALIDAÇÃO DE ID (CRÍTICO)
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(produtoId)) {
      return res.status(400).json({ message: "IDs de usuário ou produto inválidos." });
    }

    const novoComentario = await Comment.create({
      userId,
      produtoId,
      texto
    });

    await novoComentario.populate("userId", "nome email");

    res.status(201).json(novoComentario);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao salvar comentário. Verifique os logs do servidor." });
  }
};
export const listarComentarios = async (req, res) => {
  try {
    const { produtoId } = req.params;

    if (!produtoId) {
      return res.status(400).json({ message: "produtoId não informado." });
    }

    const comentarios = await Comment.find({ produtoId: produtoId })
      .populate("userId", "nome email") // inclua mais campos se quiser
      .sort({ createdAt: -1 });

    return res.status(200).json(comentarios);
  } catch (error) {
    console.error("Erro ao listar comentários:", error);
    return res.status(500).json({ message: "Erro ao buscar comentários." });
  }
};
