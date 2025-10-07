import dotenv from "dotenv";
dotenv.config();

const mongoose = require("mongoose");
import app from "./app";
import connectDB from "./config/database";

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`rodando na porta ${PORT}`);  
    });
  })
  .catch((err) => {
    console.error("Falha ao iniciar o servidor:", err);
  });
