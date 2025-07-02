import express from 'express';
import { logoutSecurity } from '../controllers/securityLogoutController.js';

const router = express.Router();
router.post('/logout', logoutSecurity);

export default router;
