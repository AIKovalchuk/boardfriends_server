import { NextFunction, Request, Response } from "express";
import { placeService } from "../service";

class PlaceController {
    async getAllCitys(req: Request, res: Response, next: NextFunction) {
        try {
            const cities = await placeService.getAllCities();

            return res.json(cities);
        } catch (error) {
            next(error);
        }
    }

    async getAllLocations(req: Request, res: Response, next: NextFunction) {
        try {
            const locations = await placeService.getAllLocations();

            return res.json(locations);
        } catch (error) {
            next(error);
        }
    }
}

export default new PlaceController();
