const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const userService = require('../services/user-service');
const userValidation = require('../config/validation');

router.get('/suggest', validator.query(userValidation.userAutoSuggestValidationSchema), (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;

    userService.autoSuggestUsers(loginSubstring, limit, (err, users) => {
        if (err) {
            return res.json([]);
        }

        res.json(users);
    });
});

router.get('/:id', validator.params(userValidation.userIdValidationSchema), async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await userService.findUser(userId);

        if (!user) {
            return res.sendStatus(404);
        }

        res.json(user);
    } catch (err) {
        res.status(err.status)
            .json({ message: err.message });
    }
});

router.post('/', validator.body(userValidation.userDataValidationSchema), (req, res) => {
    userService.createUser(req.body, (err, user) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.status('201').json(user);
    });
});

router.put('/:id',
    validator.params(userValidation.userIdValidationSchema),
    validator.body(userValidation.userDataValidationSchema),
    async (req, res) => {
        const userId = req.params.id;

        /**
         * Here we have idempotent request - it always has the same effect so event if user already has been updated we
         * might respond with 200/204 because operation was successful and its retry will have the same effect
         */
        try {
            await userService.updateUser(userId, req.body);

            /**
             * Also, here we could return either base status code or whole entity within body
             */
            res.sendStatus(200);
        } catch (err) {
            res.status(err.status).json({ message: err.message });
        }
    });

router.delete('/:id', validator.params(userValidation.userIdValidationSchema), async (req, res) => {
    const userId = req.params.id;

    try {
        await userService.deleteUser(userId);

        /**
         * Here we may return 404 also if an entity already has been deleted
         */
        res.sendStatus(200);
    } catch (err) {
        res.status(err.status).send({ message: err.message });
    }
});

module.exports = router;
