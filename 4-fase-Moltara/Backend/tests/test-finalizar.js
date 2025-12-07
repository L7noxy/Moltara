import { finalizarCompra } from '../src/Modules/Order/order.service.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO = process.env.MONGO_URI;

async function start() {
  await mongoose.connect(MONGO);
  console.log('Mongo conectado.');

  const usuarioId = '676f8b2d8b18de47f2c83441'; // qualquer usuário
  const items = [
    { produtoId: '676f8ba38b18de47f2c83460', quantidade: 2 }
  ];

  const callbackURL = 'http://localhost:4000/meu-callback';

  try {
    const pedido = await finalizarCompra(usuarioId, items, callbackURL);
    console.log('Pedido criado:', pedido.numeroPedido);
  } catch (err) {
    console.error('Erro no teste:', err.message);
  }
}

start();
