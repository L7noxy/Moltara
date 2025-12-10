import axios from 'axios';
import { createOrder, findOrderByItemIdMaquina } from './order.repository.js'; 

// 🛑 MUDAR: Defina esta URL em um arquivo de configuração global (ex: middleware.config.js)
const MAQUINA_BASE_URL = 'http://52.72.137.244:3000';
const START_PRODUCTION_URL = `${MAQUINA_BASE_URL}/queue/add`;

export const finalizarCompra = async (userId, itemsDoCarrinho, total, callbackUrl) => {
    
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

    for (const item of novoPedido.items) {
        for (let i = 0; i < item.quantidade; i++) {
            const itemIdMaquina = `${item.produto.toString()}-${novoPedido._id.toString()}-${i}`; 
            
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
                            callbackURL: callbackUrl, 
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

