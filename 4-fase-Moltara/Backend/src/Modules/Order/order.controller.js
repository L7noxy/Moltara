export const receberCallbackMaquina = async (req, res) => {
    const { id, status, slot } = req.body;

    if (!id || status !== 'ready') {
        return res.status(200).json({ message: "Notificação recebida, status não é 'ready'." });
    }

    try {
        const pedido = await Order.findOne({ 'items.itemIdMaquina': id });

        if (pedido) {
            const item = pedido.items.find(i => i.itemIdMaquina === id);
            
            if (item) {
             item.statusProducao = 'PRONTO';
             item.slotExpedicao = slot; 

             const todosProntos = pedido.items.every(i => i.statusProducao === 'PRONTO');

                if (todosProntos) {
                    pedido.statusPedido = 'CONCLUIDO';

                } else {
                    pedido.statusPedido = 'PRODUCAO_EM_ANDAMENTO';
                }

             await pedido.save();
             return res.status(200).json({ message: "Status do produto atualizado com sucesso." });
            }
        }
        return res.status(404).json({ message: "Item da máquina não encontrado no banco de dados." });

    } catch (error) {
     console.error("Erro ao processar callback da máquina:", error);
     return res.status(500).json({ message: "Erro interno no processamento do callback." });
    }
};