import { rastrearPedido } from '../src/Modules/Order/order.service.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const res = await rastrearPedido(1); // coloque o numeroPedido real

  console.log(JSON.stringify(res, null, 2));
}

run();
