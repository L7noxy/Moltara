import 'dotenv/config';

import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./Config/database.js";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Falha ao iniciar o servidor:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("Erro ao conectar ao banco de dados:", err);
});

export default app;