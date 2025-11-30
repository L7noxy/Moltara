import express from 'express';
const router = express.Router();

import { getAdminProfile, updateAdminProfile } from "../Modules/Adm/adm.controller.js";
import { auth } from "../middlewares/authMiddleware.js"

router.route('/')
 .get(auth, getAdminProfile)
 .put(auth, updateAdminProfile)