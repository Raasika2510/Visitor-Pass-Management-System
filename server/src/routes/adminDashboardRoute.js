// routes/adminDashboardRoute.js
import express from 'express';
import { getAllSecurityDetails } from '../controllers/adminDashboardController.js';

const router = express.Router();

router.get('/', getAllSecurityDetails);

export default router;
