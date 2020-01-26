const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const userService = require('./service');
const userValidation = require('./validation');

router.get('/suggest', validator.query(userValidation.userAutoSuggestValidationSchema), (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;

    res.json(
        userService.autoSuggestUsers(loginSubstring, limit)
    );
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
    const user = userService.createUser(req.body);

    if (user) {
        res.status('201').json(user);
    } else {
        res.status(500).send('User cannot be created');
    }
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
