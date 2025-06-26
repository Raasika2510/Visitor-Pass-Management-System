import { exitVisitor } from "../controllers/securityExitVisitorController.js";
import express from 'express';

const router = express.Router()
router.post('/crud',exitVisitor)

export default router;