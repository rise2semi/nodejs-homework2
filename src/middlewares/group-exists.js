const GroupService = require('../services/group-service');
const { BadRequestError } = require('../services/error-service');

module.exports = () => async (req, res, next) => {
    const groupId = req.params.id;
    const group = await GroupService.findGroup(groupId);

    if (!group) {
        return next(new BadRequestError('Group is not found'));
    }

    next();
};
