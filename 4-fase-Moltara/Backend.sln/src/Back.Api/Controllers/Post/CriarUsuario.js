const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend rodando!');
});

app.post('/criar-usuario', (req, res) => {
    res.send('Usuário criado com sucesso!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app