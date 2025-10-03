const express = require('express');
const cors = require('cors');
const cartRoutes = require('./routes/cart.routes');
const checkoutRoutes = require('./routes/checkout');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/usuario', userRoutes);
app.use('/api/produto', productRoutes);

module.exports = app;