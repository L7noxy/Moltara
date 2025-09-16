app.put("/cart/:id", async (req, res) => {
  try {
    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      req.body,
      { quantidade: req.body.quantidade },
      { new: true }
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
