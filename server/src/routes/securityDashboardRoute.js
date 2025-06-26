import { getTodayVisitors } from '../controllers/securityDashboardController.js';
import express from 'express';

const router = express.Router()
router.get('/read',getTodayVisitors)

export default router;