import { Router } from "express";
import UserController from "../controller/user";
import { body } from "express-validator";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post(
    "/registration",
    body("email").isEmail(),
    body("password").isLength({ min: 6, max: 32 }),
    UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);

export default router;
