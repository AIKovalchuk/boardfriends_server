import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError";
import TokenService from "../service/token";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizatedHeader = req.headers.authorization;
        if (!authorizatedHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizatedHeader.split(" ")[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        res.locals.user = userData;
        next();
    } catch (error) {
        return next(ApiError.UnauthorizedError());
    }
};

export default authMiddleware;
