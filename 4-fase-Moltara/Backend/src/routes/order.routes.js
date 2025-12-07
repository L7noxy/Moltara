// order.routes.js
import express from 'express';
import * as OrderController from '../Modules/Order/order.controller.js';

const router = express.Router();

// Criar novo pedido
router.post('/pedidos', OrderController.criarPedido);

// Callback para receber confirmações de clientes (opcional)
router.post('/pedidos/callback-maquina', OrderController.receberCallbackMaquina);

// // Rastrear pedido pelo número (substitui GET por ID)
// router.get('/pedidos/rastrear/:numeroPedido', OrderController.rastrearPedido);

// // Callback das máquinas de produção
// router.post('/pedidos/callback/:numeroPedido/:itemId', OrderController.callbackProducao);

// // Confirmar entrega (protegido)
// router.post('/pedidos/:numeroPedido/confirmar-entrega', OrderController.confirmarEntrega);



export default router;