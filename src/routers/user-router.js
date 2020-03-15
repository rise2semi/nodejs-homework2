const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const userService = require('../services/user-service');
const { userAutoSuggestValidationSchema, userIdValidationSchema, userDataValidationSchema } = require('../config/validation');

const userExists = require('../middlewares/user-exists');
const { BadRequestError } = require('../services/error-service');

router.get('/suggest', validator.query(userAutoSuggestValidationSchema), async (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = await userService.autoSuggestUsers(loginSubstring, limit);

    res.json(users);
});

router.get('/:id', validator.params(userIdValidationSchema), userExists(), async (req, res) => {
    const userId = req.params.id;
    const user = await userService.findUser(userId);

    res.json(user);
});

router.post('/', validator.body(userDataValidationSchema), async (req, res, next) => {
    const user = await userService.createUser(req.body);
    if (!user) {
        return next(new BadRequestError('Cannot create a user'));
    }

    res.json(user);
});

router.put('/:id', validator.params(userIdValidationSchema), validator.body(userDataValidationSchema), userExists(), async (req, res, next) => {
    const userId = req.params.id;
    const user = await userService.updateUser(userId, req.body);
    if (!user) {
        return next(new BadRequestError('Cannot update a user'));
    }

    res.status('200').send();
});

router.delete('/:id', validator.params(userIdValidationSchema), async (req, res, next) => {
    const userId = req.params.id;
    const user = await userService.deleteUser(userId);
    if (!user) {
        return next(new BadRequestError('Cannot delete a user'));
    }

    res.status('200').send();
});

module.exports = router;
