// src/Modules/Order/order.controller.js

import asyncHandler from 'express-async-handler';
import { finalizarCompra, handleCallbackUpdate } from './order.service.js';
import * as cartService from '../Cart/cart.service.js'; 


export const finalizarCheckout = asyncHandler(async (req, res) => {
    // Assumindo que o ID do usuário está anexado ao req pela autenticação======
    const userId = req.user.id; 
    
    // 1. Obter os dados do carrinho atual (para transferir para Order)
    const cart = await cartService.pegarCarrinho(userId);

    if (!cart || cart.items.length === 0) {
        res.status(400);
        throw new Error("Carrinho vazio. Adicione produtos antes de finalizar.");
    }

    // 2. Definir a URL de callback pública
    // 🛑 IMPORTANTE: VOCÊ DEVE MUDAR ISTO!
    // Esta é a URL que a máquina irá chamar quando o item estiver pronto.
    const callbackUrl = `http://SEU-DOMINIO-PUBLICO.com/api/pedidos/callback`; 

    // 3. Chamar o Service para processar
    const pedido = await finalizarCompra(userId, cart.items, cart.total, callbackUrl);

    // Opcional: Limpar o carrinho após a finalização
    // await cartService.limparCarrinho(userId); 

    res.status(201).json({ 
        message: "Pedido recebido e enviado para produção.",
        pedidoId: pedido._id,
        status: pedido.statusPedido
    });
});


// @desc    Recebe o Webhook da máquina quando um item está PRONTO
// @route   POST /api/pedidos/callback
export const receberCallbackMaquina = asyncHandler(async (req, res) => {
    // A máquina envia { id, status, slot }
    const { id, status, slot } = req.body; 

    // O status 'ready' é o que nos interessa (conforme documentação do middleware)
    if (!id || status !== 'ready') {
        return res.status(200).json({ message: "Callback recebido, mas status não é 'ready'." });
    }

    try {
        await handleCallbackUpdate(id, status, slot);
        
        // Sucesso
        res.status(200).json({ message: "Status de produção atualizado com sucesso." });

    } catch (error) {
        console.error("Erro ao processar callback da máquina:", error.message);
        // Retornar 500 para a máquina tentar reenviar o callback (padrão de webhook)
        res.status(500); 
        throw new Error("Erro interno ao processar o callback.");
    }
});