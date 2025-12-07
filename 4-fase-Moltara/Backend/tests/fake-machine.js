// fake-machine.js
import express from 'express';

const app = express();
app.use(express.json());

app.post('/queue/add', (req, res) => {
  console.log('MÁQUINA FAKE: recebi requisição de produção:', req.body);

  return res.json({
    id: 'fake_machine_' + Math.floor(Math.random() * 999999),
    status: 'RECEBIDO'
  });
});

app.listen(3000, () => console.log('Máquina FAKE rodando na porta 3000'));
