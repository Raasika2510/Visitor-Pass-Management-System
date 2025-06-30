import express from "express";
import { exitVisitor } from "../controllers/securityExitVisitorController.js";

const router = express.Router();

router.post("/exit", exitVisitor); 
export default router;
