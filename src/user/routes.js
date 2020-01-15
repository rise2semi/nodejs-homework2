const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const userService = require('./service');
const userValidation = require('./validation');

router.get('/:id', validator.params(userValidation.userIdValidationSchema), (request, response) => {
    const userId = request.params.id;

    return response.json(
        userService.findUser(userId)
    );
});

router.post('/', validator.body(userValidation.userDataValidationSchema), (request, response) => {
    const user = userService.createUser(request.body);

    return (user) ? response.status('201').json(user) : response.status(500).send('User cannot be created');
});

router.put('/:id', validator.params(userValidation.userIdValidationSchema), validator.body(userValidation.userDataValidationSchema), (request, response) => {
    const userId = request.params.id;
    const updatedUser = userService.updateUser(userId, request.body);

    return response.json(updatedUser);
});

router.delete('/:id', validator.params(userValidation.userIdValidationSchema), (request, response) => {
    const userId = request.params.id;
    userService.deleteUser(userId);

    return response.status('200').send();
});

router.get('/getAutoSuggestUsers/:loginSubstring/:limit', (request, response) => {
    const loginSubstring = request.params.loginSubstring;
    const limit = request.params.limit;

    return response.json(
        userService.autoSuggestUsers(loginSubstring, limit)
    );
});

module.exports = router;
