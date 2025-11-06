app.post("/produto", async(req, res) => {
    try {
        const item = new Produto(req.body);
        await item.save();
        res.status(201).json(item);
    }catch (error) {
        res.status(400).json({ error: error.message });
        console.error("Ocorreu um erro ao salvar os dados:", error);
    }
});