const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const groupService = require('../services/group-service');
const userGroupService = require('../services/user-group-service');
const { groupIdValidationSchema, groupDataValidationSchema, groupUsersDataValidationSchema } = require('../config/validation');

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
    if (!group) {
        return res.status(404).send({ error: 'Cannot create a group' });
    }

    res.status('201').json(group);
});

router.put('/:id', validator.params(groupIdValidationSchema), validator.body(groupDataValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.updateGroup(groupId, req.body);
    if (!group) {
        return res.status(404).send({ error: 'Cannot update a group' });
    }

    res.status('200').send();
});

router.delete('/:id', validator.params(groupIdValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.deleteGroup(groupId);
    if (!group) {
        return res.status(404).send({ error: 'Cannot update a group' });
    }

    res.status('200').send();
});

router.post('/:id/users', validator.params(groupIdValidationSchema), validator.body(groupUsersDataValidationSchema), async (req, res) => {
    const groupId = req.params.id;
    const status = await userGroupService.addUsersToGroup(groupId, req.body.userIds);
    if (!status) {
        return res.status(404).send({ error: 'Cannot add users to a group' });
    }

    res.status('200').send();
});

module.exports = router;
