import express from 'express';
import { getAdminProfile, updateAdminProfile } from '../controllers/adminProfileController.js';

const router = express.Router();

router.get('/:id', getAdminProfile);
router.put('/:id', updateAdminProfile);

export default router;
