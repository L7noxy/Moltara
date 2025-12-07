// order.routes.js
import express from 'express';
import * as OrderController from './order.controller.js';

const router = express.Router();

// Criar novo pedido
router.post('/pedidos', OrderController.criarPedido);

// Rastrear pedido pelo número (substitui GET por ID)
router.get('/pedidos/rastrear/:numeroPedido', OrderController.rastrearPedido);

// Callback das máquinas de produção
router.post('/pedidos/callback/:numeroPedido/:itemId', OrderController.callbackProducao);

// Confirmar entrega (protegido)
router.post('/pedidos/:numeroPedido/confirmar-entrega', OrderController.confirmarEntrega);

// Callback para receber confirmações de clientes (opcional)
router.post('/pedidos/callback-cliente', OrderController.receberCallbackCliente);

export default router;