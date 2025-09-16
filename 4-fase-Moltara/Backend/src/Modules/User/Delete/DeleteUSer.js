app.delete("/usuario/:id", async(req, res) => {
    try{
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
})

app.delete("/usuario", async(req, res) => {
    await Usuario.deleteMany();
    res.json({ message: "Todos os usuários excluídos" });
})