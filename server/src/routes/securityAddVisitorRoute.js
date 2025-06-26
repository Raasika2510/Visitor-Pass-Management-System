import { addVisitor } from "../controllers/securityAddVisitorController.js";
import express from 'express';

const router = express.Router()
router.post('/crud',addVisitor)

export default router;