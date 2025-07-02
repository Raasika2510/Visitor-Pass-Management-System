import express from 'express';
import {
  getAllSecurityUsers,
  addSecurityUser,
  updateSecurityUser,
  deleteSecurityUser
} from "../controllers/adminUserController.js";

const router = express.Router();

router.get('/', getAllSecurityUsers);
router.post('/', addSecurityUser);
router.put('/:id', updateSecurityUser);
router.delete('/:id', deleteSecurityUser);

export default router;
