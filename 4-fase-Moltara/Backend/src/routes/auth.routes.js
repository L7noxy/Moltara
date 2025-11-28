import express from "express";
import { login, register } from "../routes/auth.js";

const router = express.Router();

export default router

router.post("/login", login);