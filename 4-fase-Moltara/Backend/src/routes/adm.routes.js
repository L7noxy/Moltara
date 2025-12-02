import express from 'express';
const router = express.Router();

import { getAdminProfile, updateAdminProfile } from "../Modules/Adm/adm.controller.js";
import { loginAdmin } from "../Modules/Adm/adm.login.controller.js";
import { auth } from "../middlewares/auth.js";

router.post("/login", loginAdmin);

router.route("/")
  .get(auth, getAdminProfile)
  .put(auth, updateAdminProfile);

export default router;
