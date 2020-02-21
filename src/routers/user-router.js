const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});
const { userIsRequired } = require('../middlewares');

const userService = require('../services/user-service');
const { userAutoSuggestValidationSchema, userIdValidationSchema, userDataValidationSchema } = require('../config/validation');

/**
 * Here I have similar tips as for group router
 * 1) Encapsulate logic of checking does you target resource exists or not within something that you can reuse
 * For an express app a concept of middlewares(chain of responsibility!) has great application
 *
 * 2) Use proper response codes when something goes wrong.
 */

router.get('/suggest', validator.query(userAutoSuggestValidationSchema), async (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = req.query.limit;
    const users = await userService.autoSuggestUsers(loginSubstring, limit);

    res.json(users);
});

router.get('/:id', validator.params(userIdValidationSchema), userIsRequired(), async (req, res) => {
    const userId = req.params.id;
    const user = await userService.findUser(userId);
    // if (!user) {
    //     return res.status(404).send({ error: 'Cannot find a user' });
    // }

    res.json(user);
});

router.post('/', validator.body(userDataValidationSchema), async (req, res) => {
    const user = await userService.createUser(req.body);
    /**
     * Here you can not send 404 response code. It mostly about inappropriate resource URI
     * More correct will be using 400(generic refuse to resolve a request) or 403(user has lack of permissions to perform the action)
     */
    if (!user) {
        return res.status(400).send({ error: 'Cannot create a user' });
    }

    res.json(user);
});

router.put('/:id', validator.params(userIdValidationSchema), validator.body(userDataValidationSchema), userIsRequired(), async (req, res) => {
    const userId = req.params.id;
    const user = await userService.updateUser(userId, req.body);
    /**
     * The same here. Consider to use 400/403/401 rather that 404 that points to incorrect URI
     */
    if (!user) {
        return res.status(400).send({ error: 'Cannot update a user' });
    }

    res.status('200').send();
});

router.delete('/:id', validator.params(userIdValidationSchema), userIsRequired(), async (req, res) => {
    const userId = req.params.id;
    const user = await userService.deleteUser(userId);
    /**
     * And here =)
     */
    if (!user) {
        return res.status(400).send({ error: 'Cannot delete a user' });
    }

    res.status('200').send();
});

module.exports = router;
