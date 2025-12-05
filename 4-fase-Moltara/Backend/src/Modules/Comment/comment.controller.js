import Comment from "./comment.schema.js";

// Criar um novo comentário
export const criarComentario = async (req, res) => {
  try {
    const { produtoId, texto } = req.body;
    // Assumindo que o middleware de auth popula req.session.userId ou req.user.id
    // Como visto no Cart, usamos req.session.userId
    const userId = req.session.userId; 

    if (!userId) {
      return res.status(401).json({ message: "Você precisa estar logado para comentar." });
    }

    const novoComentario = await Comment.create({
      userId,
      produtoId,
      texto
    });

    // Popula dados do usuário para retorno imediato (opcional, bom para UI)
    await novoComentario.populate("userId", "nome email");

    res.status(201).json(novoComentario);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ message: "Erro ao salvar comentário." });
  }
};

// Listar comentários de um produto
export const listarComentarios = async (req, res) => {
  try {
    const { produtoId } = req.params;

    const comentarios = await Comment.find({ produtoId })
      .populate("userId", "nome") // Traz apenas o nome do usuário
      .sort({ createdAt: -1 }); // Mais recentes primeiro

    res.status(200).json(comentarios);
  } catch (error) {
    console.error("Erro ao listar comentários:", error);
    res.status(500).json({ message: "Erro ao buscar comentários." });
  }
};
