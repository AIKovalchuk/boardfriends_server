import { NextFunction, Request, Response } from "express";
import UserService from "../service/user";
import { validationResult } from "express-validator";
import ApiError from "../exceptions/apiError";
import { prisma } from "@prisma/client";
import { IUserCreate } from "../dto/user";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
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
            const userDto = req.body as IUserCreate;
            const userData = await UserService.registration(userDto);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            // return res.redirect(process)
            return res.send("Аккаунт успешно активирован");
        } catch (error) {
            next(error);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getCurrentUser(req: Request, res: Response, next: NextFunction) {
        try {
            return res.json(res.locals.user);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
