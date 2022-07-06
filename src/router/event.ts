import { Router } from "express";
import { body, query } from "express-validator";
import EventController from "../controller/event";
import authMiddleware from "../middleware/auth";

const router = Router();

router.get(
    "/events",
    query("offset").isInt(),
    query("take").isInt(),
    EventController.getAllEvents
);
router.get("/event/:id", EventController.getEvent);
router.post("/event", authMiddleware, EventController.create);

export default router;
