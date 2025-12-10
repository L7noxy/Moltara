import asyncHandler from 'express-async-handler';
import { finalizarCompra, handleCallbackUpdate } from './order.service.js';
import * as cartService from '../Cart/cart.service.js'; 

// ⚠️ Requer middleware de autenticação (protect)
export const finalizarCheckout = asyncHandler(async (req, res) => {
    // Assumindo que o ID do usuário está anexado ao req pela autenticação
    const userId = req.user.id; 
    
    const cart = await cartService.pegarCarrinho(userId);

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Carrinho vazio. Adicione produtos antes de finalizar.");
    }


    const callbackUrl = `http://localhost:3000/.com/api/pedidos/callback`; 

    const pedido = await finalizarCompra(userId, cart.items, cart.total, callbackUrl);
    
     await cartService.limparCarrinho(userId); 

    res.status(201).json({ 
        message: "Pedido recebido e enviado para produção.",
        pedidoId: pedido._id,
        status: pedido.statusPedido
    });
});


export const receberCallbackMaquina = asyncHandler(async (req, res) => {
    const { id, status, slot } = req.body; 

    if (!id || status !== 'ready') {
        return res.status(200).json({ message: "Callback recebido, mas status não é 'ready'." });
    }

    try {
        await handleCallbackUpdate(id, status, slot);
        
        res.status(200).json({ message: "Status de produção atualizado com sucesso." });

    } catch (error) {
        console.error("Erro ao processar callback da máquina:", error.message);
        res.status(500); 
        throw new Error("Erro interno ao processar o callback.");
    }
});