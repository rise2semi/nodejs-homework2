const UserService = require('../services/user-service');
const { BadRequestError } = require('../services/error-service');

module.exports = () => async (req, res, next) => {
    const userId = req.params.id;
    const user = await UserService.findUser(userId);

    if (!user) {
        return next(new BadRequestError('User is not found'));
    }

    next();
};
