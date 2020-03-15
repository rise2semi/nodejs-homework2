const jwt = require('jsonwebtoken');

const { UnauthorizedError, ForbiddenError } = require('../services/error-service');

require('dotenv').config();
const { JWT_KEY } = process.env;

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');

        try {
            jwt.verify(token, JWT_KEY);
            return next();
        } catch (err) {
            return next(new ForbiddenError('No access'));
        }
    } else {
        return next(new UnauthorizedError('Cannot find authorization header'));
    }
};
