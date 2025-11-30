import express from "express";
import cors from "cors";
import MongoStore from "connect-mongo";
import session from "express-session";

// Importando as rotas
import checkoutRoutes from "./routes/checkout.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}));

// Criando a sessão

app.use(
  session({
    secret: "um-segredo-muito-seguro",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/usuario", userRoutes);
app.use("/api/produto", productRoutes);

export default app;
