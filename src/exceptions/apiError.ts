class ApiError extends Error {
    public status: number;
    public errors: string[];

    constructor(
        status: number,
        message: string | undefined,
        errors: string[] = []
    ) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не автаризован");
    }

    static BadRequest(message: string | undefined, errors = []) {
        return new ApiError(400, message, errors);
    }
}

export default ApiError;
