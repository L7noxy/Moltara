app.get("/produto", async(req, res) => {
    const items = await productSchema.find();
    res.json(items);
})