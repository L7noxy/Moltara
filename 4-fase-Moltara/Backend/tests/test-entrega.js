import { confirmarEntrega } from '../src/Modules/Order/order.service.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);

  const res = await confirmarEntrega(1, 'CODIGO123', {
    recebedor: 'Fulano'
  });

  console.log(res);
}

start();