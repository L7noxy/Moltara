import express from "express";
const router = express.Router();

router.post("/checkout", async (req, res) => {
  const { items, total } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "O carrinho está vazio." });
    }

    const newOrder = new Order({
      items,
      total,
      status: "completed",
    });

    await newOrder.save();

    res.status(200).json({
      message: "Compra finalizada com sucesso!",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Erro ao processar a compra:", error);
    res.status(500).json({ error: "Falha interna do servidor." });
  }
});

export default router;
