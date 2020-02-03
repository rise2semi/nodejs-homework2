const express = require('express');
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const groupService = require('../services/group-service');
const { groupIdValidationSchema, groupDataValidationSchema } = require('../config/validation');

router.get('/', (req, res) => {
    groupService.findAllGroups((err, groups) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.json(groups);
    });
});

router.get('/:id', validator.params(groupIdValidationSchema), (req, res) => {
    const groupId = req.params.id;

    groupService.findGroup(groupId, (err, group) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.json(group);
    });
});

router.post('/', validator.body(groupDataValidationSchema), (req, res) => {
    groupService.createGroup(req.body, (err, group) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.status('201').json(group);
    });
});

router.put('/:id', validator.params(groupIdValidationSchema), validator.body(groupDataValidationSchema), (req, res) => {
    const groupId = req.params.id;

    groupService.updateGroup(groupId, req.body, (err, updatedGroup) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.json(updatedGroup);
    });
});

router.delete('/:id', validator.params(groupIdValidationSchema), (req, res) => {
    const groupId = req.params.id;

    groupService.deleteGroup(groupId, (err) => {
        if (err) {
            return res.status(err.status).send(err.message);
        }

        res.status('200').send();
    });
});

module.exports = router;
