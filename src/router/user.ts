import { Router } from "express";
import UserController from "../controller/user";
import authMiddleware from "../middleware/auth";

const router = Router();

router.get("/me", authMiddleware, UserController.refresh);

export default router;
