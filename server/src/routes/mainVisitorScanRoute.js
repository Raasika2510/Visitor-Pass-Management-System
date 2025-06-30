import { getVisitorDetails } from "../controllers/mainVisitorScanController.js";
import express from 'express'

const router = express.Router();

router.post('/scan',getVisitorDetails);

export default router;