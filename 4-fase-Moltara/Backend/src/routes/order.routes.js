import express from 'express';
const router = express.Router();

router.post('/callback', receberCallbackMaquina);

export default router;
