import { NextFunction, Request, Response } from "express";
import UserService from "../service/user";

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.registration(email, password);
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
            console.log("hello world");
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("hello world");
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
            console.log("hello world");
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(["123", "456"]);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
