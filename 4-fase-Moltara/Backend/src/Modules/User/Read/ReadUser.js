app.get("/usuario", async(req, res) => {
    const items = await usuarioSchema.find();
    res.json(items);
})