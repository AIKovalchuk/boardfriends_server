import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/apiError";

const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ApiError) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    console.log(err);
    return res.status(500).json({ message: "Непредвиденная ошибка." + err });
};

export default errorMiddleware;
