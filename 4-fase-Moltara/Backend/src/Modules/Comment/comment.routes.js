import express from "express";
import { criarComentario, listarComentarios } from "./comment.controller.js";

const router = express.Router();

router.post("/criar", criarComentario);
router.get("/:produtoId", listarComentarios);

export default router;
