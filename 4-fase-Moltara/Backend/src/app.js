<<<<<<< HEAD
=======
// src/app.js
const express = require('express');
const cors = require('cors'); // Para permitir requisições de outras origens
>>>>>>> 735988fb2a61425c33d567c10ac9238a614c9d15
const cartRoutes = require('./modules/cart/cart.routes');

const app = express();

// Middlewares globais
app.use(cors()); // Permite que o seu frontend se conecte ao backend
app.use(express.json()); // Permite que o Express leia o corpo das requisições em JSON
app.use(express.urlencoded({ extended: true })); // Permite ler dados de formulários

// Rotas da API
app.use('/api/cart', cartRoutes);

// Exporta o app para ser usado no server.js
module.exports = app;