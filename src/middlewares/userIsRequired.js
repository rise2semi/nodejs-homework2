const UserService = require('../services/user-service');

module.exports = () => async (req, res, next) => {
    const userId = req.params.id;
    const user = await UserService.findUser(userId);
    if (!user) {
        res.status(404)
            .json({ error: 'User is not found!' });
    }

    next();
};
