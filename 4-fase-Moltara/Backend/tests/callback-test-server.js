import express from 'express';

const app = express();
app.use(express.json());

app.post('/meu-callback', (req, res) => {
  console.log('CLIENTE recebeu callback:', req.body);
  res.json({ recebido: true });
});

app.listen(4000, () => console.log('Callback CLIENTE rodando na porta 4000'));