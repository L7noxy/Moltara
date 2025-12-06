import Order from './order.model.js';
import axios from 'axios';
import { MAQUINA_BASE_URL } from '../../Config/middleware.config.js';

const START_PRODUCTION_URL = `${MAQUINA_BASE_URL}/queue/add`;

export const finalizarCompra = async (usuarioId, itemsDoCarrinho) => {
    const novoPedido = new Order({
        usuarioId,
        items: itemsDoCarrinho.map(item => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
        })),
    });
    await novoPedido.save();}

    for (const item of novoPedido.items) {
        for (let i = 0; i < item.quantidade; i++) {
            try {
                const response = await axios.post(START_PRODUCTION_URL, {
                 id: `${item.produtoId}-${novoPedido._id}-${i}`, 
                    
                 callbackURL: `http://localhost:3000//api/pedidos/callback`, 
                });

                const itemIdMaquina = response.data.id; 
                item.itemIdMaquina = itemIdMaquina;

            } catch (error) {
                console.error(`Falha ao enviar produto ${item.produtoId} para a máquina:`, error.message);
                item.statusProducao = 'FALHA_ENVIO';
            }

        }
    }

await novoPedido.save();
return novoPedido;

