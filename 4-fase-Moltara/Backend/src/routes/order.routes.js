import express from 'express';
const router = express.Router();
import { receberCallbackMaquina } from '../Modules/Order/order.controller.js';

router.post('/callback', receberCallbackMaquina);

export default router;
