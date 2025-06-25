import express from "express"
import { SecurityLogin } from "../controllers/securityLoginController.js"

const router = express.Router();
router.post('/login',SecurityLogin);

export default router