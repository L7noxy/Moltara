app.delete("/cart/:id", async(req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.delete("/cart/:id", async(req, res) => {
    await Cart.deleteAll();
    res.json({ message: "Carrinho excluido" });
})