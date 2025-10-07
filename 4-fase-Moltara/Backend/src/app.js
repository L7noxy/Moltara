import express from 'express';
import cors from 'cors';
import cartRoutes from './routes/cart.routes';
import checkoutRoutes from './routes/checkout';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/usuario', userRoutes);
app.use('/api/produto', productRoutes);

export default app;