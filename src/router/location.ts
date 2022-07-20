import { Router } from "express";
import { PlaceController } from "../controller";

const router = Router();

router.get("/cities", PlaceController.getAllCitys);
router.get("/users", PlaceController.getAllLocations);

export default router;
