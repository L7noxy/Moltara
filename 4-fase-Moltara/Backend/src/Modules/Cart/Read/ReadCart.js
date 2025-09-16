app.get("/cart", async(req, res) => {
    const items = await cartSchema.find();
    res.json(items);
})