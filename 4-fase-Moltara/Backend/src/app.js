import express from "express";
import cors from "cors";
import checkoutRoutes from "./routes/checkout.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/usuario", userRoutes);
app.use("/api/produto", productRoutes);

export default app;
