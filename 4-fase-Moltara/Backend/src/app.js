
const express = require('express');
const cors = require('cors');
const cartRoutes = require('./modules/cart/cart.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartRoutes);

module.exports = app;