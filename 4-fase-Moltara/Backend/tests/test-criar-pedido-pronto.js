import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Order from "../src/Modules/Order/order.schema.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const pedido = await Order.create({
      usuarioId: "674fd8e2f4f3ce0012b4a111",
      numeroPedido: 12345,
      items: [
        {
          produtoId: "674fd8e2f4f3ce0012b4a222",
          quantidade: 1,
          statusProducao: "PRODUZIDO"
        }
      ]
    });

    console.log("Pedido criado com sucesso:");
    console.log(pedido);
    process.exit(0);

  } catch (err) {
    console.error("Erro ao criar pedido:");
    console.error(err);
    process.exit(1);
  }
};

run();
