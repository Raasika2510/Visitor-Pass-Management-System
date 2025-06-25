import express from "express";
import { adminLogin } from "../controllers/adminLoginController.js";

const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log("🚦 Route Hit: /api/admin/login");
  next();
}, adminLogin);

export default router;
