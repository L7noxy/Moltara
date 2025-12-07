// src/Modules/Order/order.service.js

import Order from './order.schema.js';
import axios from 'axios';
import { createOrder, findOrderByItemIdMaquina } from './order.repository.js'; 

// 🛑 MUDAR: Defina esta URL em um arquivo de configuração global (ex: middleware.config.js)
const MAQUINA_BASE_URL = 'http://52.72.137.244:3000';
const START_PRODUCTION_URL = `${MAQUINA_BASE_URL}/queue/add`;

/**
 * 1. Finaliza a compra, cria o Order e envia cada UNIDADE para a máquina.
 */
export const finalizarCompra = async (userId, itemsDoCarrinho, total, callbackUrl) => {
    
    // 1. Criar o Order (Modelo Base)
    const orderData = {
        user: userId,
        items: itemsDoCarrinho.map(item => ({
            produto: item.produto,
            quantidade: item.quantidade,
            statusProducao: 'AGUARDANDO' 
        })),
        total: total,
        statusPedido: 'RECEBIDO'
    };
    let novoPedido = await createOrder(orderData);
    
    const productionPromises = [];

    // 2. Fatiar e Enviar para Produção
    for (const item of novoPedido.items) {
        for (let i = 0; i < item.quantidade; i++) {
            // Cria um ID ÚNICO que será usado no callback (itemIdMaquina)
            const itemIdMaquina = `${item.produto.toString()}-${novoPedido._id.toString()}-${i}`; 
            
            // Encontra o subdocumento no pedido para atualizar o ID da máquina
            const subdocItem = novoPedido.items.find(i => 
                i.produto.toString() === item.produto.toString() && !i.itemIdMaquina
            );
            
            if(subdocItem) {
                subdocItem.itemIdMaquina = itemIdMaquina;
                subdocItem.statusProducao = 'ENVIADO';

    
                const productionPromise = (async () => {
                    try {
                        await axios.post(START_PRODUCTION_URL, {
                            id: itemIdMaquina, 
                            callbackURL: callbackUrl, // Sua URL pública de callback
                        });
                    } catch (error) {
                        console.error(`Falha ao enviar item ${itemIdMaquina} para a máquina:`, error.message);
                        subdocItem.statusProducao = 'FALHA_ENVIO';
                    }
                })();
                productionPromises.push(productionPromise);
            }
        }
    }
    await Promise.all(productionPromises);

    novoPedido.statusPedido = 'PRODUCAO_EM_ANDAMENTO';

    await novoPedido.save();
    return novoPedido;
};

export const handleCallbackUpdate = async (itemIdMaquina, status, slot) => {
    const pedido = await findOrderByItemIdMaquina(itemIdMaquina);

    if (!pedido) {
        throw new Error("Pedido não encontrado para este ID de máquina.");
    }
    
    let itemAtualizado = false;

    pedido.items.forEach(item => {
        if (item.itemIdMaquina === itemIdMaquina && status === 'ready') {
            item.statusProducao = 'PRONTO';
            item.slotExpedicao = slot;
            itemAtualizado = true;
        }
    });

    if (!itemAtualizado) {
         throw new Error("Item da máquina já processado ou status inválido.");
    }
    
    const todosProntos = pedido.items.every(item => item.statusProducao === 'PRONTO');
    if (todosProntos) {
        pedido.statusPedido = 'CONCLUIDO';
    } else {
        pedido.statusPedido = 'PRODUCAO_EM_ANDAMENTO';
    }

    await pedido.save();
    return pedido;
};

