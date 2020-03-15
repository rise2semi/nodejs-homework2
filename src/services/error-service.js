class BadRequestError extends Error {
    constructor(message, statusCode = 400) {
        super(message);

        this.statusCode = statusCode;
    }
}

class UnauthorizedError extends Error {
    constructor(message, statusCode = 401) {
        super(message);

        this.statusCode = statusCode;
    }
}

class ForbiddenError extends Error {
    constructor(message, statusCode = 403) {
        super(message);

        this.statusCode = statusCode;
    }
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
    ForbiddenError
};
