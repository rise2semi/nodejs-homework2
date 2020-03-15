const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const { userCredentialsValidationSchema } = require('../config/validation');
const userService = require('../services/user-service');
const { UnauthorizedError } = require('../services/error-service');

router.get('/', validator.query(userCredentialsValidationSchema), async (req, res, next) => {
    const { username, password } = req.body;
    const user = await userService.findUserByCredentials(username, password);
    if (!user) {
        return next(new UnauthorizedError('Login failed'));
    }

    const token = await userService.generateAuthToken(user.id);

    res.json({ token });
});

module.exports = router;
