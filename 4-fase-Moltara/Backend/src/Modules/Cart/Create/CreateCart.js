app.post("/cart", async(req, res) => {
    try {
        const item = new Cart(req.body);
        await item.save();
        res.status(201).json(item);
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}) 