const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const groupService = require('../services/group-service');
const userGroupService = require('../services/user-group-service');
const { groupIdValidationSchema, groupDataValidationSchema, groupUsersDataValidationSchema } = require('../config/validation');

/**
 * Will be great to encapsulate and reuse login of checking does a group exist or not
 * Similarly to that as I did it with the user router
 *
 * After that you will be able to use more precise response code in your controllers in case something goes wrong
 *
 * Admittedly it is another my hind for you - consider to user proper response codes - make life of your frontend team easier =3
 */

router.get('/', async (req, res) => {
    const groups = await groupService.findAllGroups();
    if (!groups) {
        return res.status(404).send({ error: 'Cannot find any group' });
    }

    res.json(groups);
});

router.get('/:id', validator.params(groupIdValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.findGroup(groupId);
    if (!group) {
        return res.status(404).send({ error: 'Cannot find a group' });
    }

    res.json(group);
});

router.post('/', validator.body(groupDataValidationSchema), async (req, res) => {
    const group = await groupService.createGroup(req.body);
    /**
     * And here
     */
    if (!group) {
        return res.status(404).send({ error: 'Cannot create a group' });
    }

    res.status('201').json(group);
});

router.put('/:id', validator.params(groupIdValidationSchema), validator.body(groupDataValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.updateGroup(groupId, req.body);
    /**
     * And here also
     */
    if (!group) {
        return res.status(404).send({ error: 'Cannot update a group' });
    }

    res.status('200').send();
});

router.delete('/:id', validator.params(groupIdValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.deleteGroup(groupId);
    /**
     * Hm.. seems like hee too
     */
    if (!group) {
        return res.status(404).send({ error: 'Cannot update a group' });
    }

    res.status('200').send();
});

router.post('/:id/users', validator.params(groupIdValidationSchema), validator.body(groupUsersDataValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    await userGroupService.addUsersToGroup(groupId, req.body.userIds);
    /**
     * Unfortunately here too =\
     */
    // if (!status) {
    //     return res.status(404).send({ error: 'Cannot add users to a group' });
    // }

    res.status('200').send();
});

module.exports = router;
