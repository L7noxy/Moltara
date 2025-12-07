// mock-machine.js
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/queue/add", async (req, res) => {
  console.log("[MOCK] Recebeu /queue/add:", req.body);

  const { id, callbackURL } = req.body;

  // responde imediatamente como a máquina real faria
  res.json({ ok: true, id });

  // depois de X segundos, chama o callbackURL simulando produção concluída
  setTimeout(async () => {
    try {
      console.log(`[MOCK] Chamando callback ${callbackURL} para id ${id}`);
      await axios.post(callbackURL, {
        id,
        status: "ready",
        slot: Math.floor(Math.random() * 10) + 1
      }, { timeout: 5000 });
      console.log("[MOCK] Callback enviado com sucesso.");
    } catch (err) {
      console.error("[MOCK] Erro ao enviar callback:", err.message);
    }
  }, 3000); // 3s delay (ajuste se necessário)
});

const PORT = 3001;
app.listen(PORT, () => console.log(`[MOCK] Máquina fake rodando em http://localhost:${PORT}`));
