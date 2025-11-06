import express from "express";
import crypto from "crypto";

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "s3gredo";

// precisamos do raw body para verificar assinatura
app.use((req, res, next) => {
  let data = [];
  req.on("data", chunk => data.push(chunk));
  req.on("end", () => {
    req.rawBody = Buffer.concat(data);
    next();
  });
});

app.post("/webhook", (req, res) => {
  try {
    const signatureHeader = req.headers["x-signature"] || req.headers["stripe-signature"];
    if (!signatureHeader) return res.status(400).send("Missing signature");

    // calcular HMAC SHA256
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
    hmac.update(req.rawBody);
    const expected = hmac.digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader))) {
      return res.status(401).send("Invalid signature");
    }

    const payload = JSON.parse(req.rawBody.toString("utf8"));
    const eventId = payload.id || payload.event_id;

    // idempotência: checar se eventId já processado (ex: DB)
    // if (await db.hasEvent(eventId)) return res.status(200).send("Already processed");

    // Acknowledge quickly
    res.status(200).send("ok");

    // Processamento assíncrono: enfileirar trabalho ou processar em background
    // ex: markOrderPaid(payload.data)
    console.log("Evento recebido:", payload.type || payload.event);
  } catch (err) {
    console.error("Erro webhook:", err);
    return res.status(500).send("server error");
  }
});

app.listen(PORT, () => console.log(`Listening ${PORT}`));
