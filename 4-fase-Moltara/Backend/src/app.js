// src/app.js
// ... outros imports e configurações

const cartRoutes = require('./modules/cart/cart.routes');

app.use('/api/cart', cartRoutes);
