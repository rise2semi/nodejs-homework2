const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const groupService = require('../services/group-service');
const userGroupService = require('../services/user-group-service');
const { groupIdValidationSchema, groupDataValidationSchema, groupUsersDataValidationSchema } = require('../config/validation');

const groupExists = require('../middlewares/group-exists');
const { BadRequestError } = require('../services/error-service');

router.get('/', async (req, res, next) => {
    const groups = await groupService.findAllGroups();
    if (!groups) {
        return next(new BadRequestError('Cannot find any group'));
    }

    res.json(groups);
});

router.get('/:id', validator.params(groupIdValidationSchema), groupExists(), async (req, res) => {
    const groupId = req.params.id;
    const group = await groupService.findGroup(groupId);

    res.json(group);
});

router.post('/', validator.body(groupDataValidationSchema), async (req, res, next) => {
    const group = await groupService.createGroup(req.body);
    if (!group) {
        return next(new BadRequestError('Cannot create a group'));
    }

    res.status('201').json(group);
});

router.put('/:id', validator.params(groupIdValidationSchema), validator.body(groupDataValidationSchema), groupExists(), async (req, res, next) => {
    const groupId = req.params.id;
    const group = await groupService.updateGroup(groupId, req.body);
    if (!group) {
        return next(new BadRequestError('Cannot update a group'));
    }

    res.status('200').send();
});

router.delete('/:id', validator.params(groupIdValidationSchema), async (req, res, next) => {
    const groupId = req.params.id;
    const group = await groupService.deleteGroup(groupId);
    if (!group) {
        return next(new BadRequestError('Cannot delete a group'));
    }

    res.status('200').send();
});

router.post('/:id/users', validator.params(groupIdValidationSchema), validator.body(groupUsersDataValidationSchema), async (req, res, next) => {
    const groupId = req.params.id;
    const status = await userGroupService.addUsersToGroup(groupId, req.body.userIds);
    if (!status) {
        return next(new BadRequestError('Cannot add users to a group'));
    }

    res.status('200').send();
});

module.exports = router;
