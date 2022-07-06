import { ValidationError } from "express-validator";

class ApiError extends Error {
    public status: number;
    public errors: string[] | ValidationError[];

    constructor(
        status: number,
        message: string | undefined,
        errors: string[] | ValidationError[] = []
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не автаризован");
    }

    static BadRequest(
        message: string | undefined,
        errors: ValidationError[] = []
    ) {
        return new ApiError(400, message, errors);
    }

    static NotFound() {
        return new ApiError(404, "Ресурс не найден");
    }
}

export default ApiError;
