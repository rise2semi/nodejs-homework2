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

router.get('/:id', validator.params(userValidation.userIdValidationSchema), (req, res) => {
    const userId = req.params.id;

    userService.findUser(userId, (err, user) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.json(user);
    });
});

router.post('/', validator.body(userValidation.userDataValidationSchema), (req, res) => {
    userService.createUser(req.body, (err, user) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.status('201').json(user);
    });
});

router.put('/:id', validator.params(userValidation.userIdValidationSchema), validator.body(userValidation.userDataValidationSchema), (req, res) => {
    const userId = req.params.id;

    userService.updateUser(userId, req.body, (err, updatedUser) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.json(updatedUser);
    });
});

router.delete('/:id', validator.params(userValidation.userIdValidationSchema), (req, res) => {
    const userId = req.params.id;

    userService.deleteUser(userId, (err) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.status('200').send();
    });
});

module.exports = router;
