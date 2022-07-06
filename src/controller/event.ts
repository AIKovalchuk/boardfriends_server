import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { IEventCreate } from "../dto/eventCreate";
import UserDto from "../dto/user";
import ApiError from "../exceptions/apiError";
import { eventService } from "../service";

class EventController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const evetCreateDto = req.body as IEventCreate;
            const user = res.locals.user as UserDto;

            const event = eventService.create(evetCreateDto, user.id);

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }

    async getAllEvents(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest(
                        "Ошибка валидации данных",
                        errors.array()
                    )
                );
            }

            const offset = Number(req.query.offset);
            const take = Number(req.query.take);

            const events = await eventService.getAllEvents(offset, take);

            return res.json(events);
        } catch (error) {
            next(error);
        }
    }

    async getEvent(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);

            const event = await eventService.getEvent(id);

            return res.json(event);
        } catch (error) {
            next(error);
        }
    }
}

export default new EventController();
