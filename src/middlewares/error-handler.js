/* eslint-disable no-unused-vars */

const { BadRequestError } = require('../services/error-service');

module.exports = (error, req, res, next) => {
    if (error instanceof BadRequestError) {
        return res.status(error.statusCode).json(error.message);
    }

    res.sendStatus(500);

    next(error);
};
