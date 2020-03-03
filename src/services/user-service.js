const User = require('../models/user');
const logger = require('../config/logger');

/**
 * Find user by ID
 * @param {Integer} id
 */
async function findUser(id) {
    logger.info(`userService.findUser, args: ${id}`);

    const user = await User.findByPk(id);

    if (user) {
        return user.get({ plain: true });
    }

    return user;
}

/**
 * Create user
 * @param {{ login: String, password: String, age: Number }} userData
 */
function createUser(userData) {
    logger.info(`userService.createUser, args: ${JSON.stringify(userData)}`);

    return User.create(userData);
}

/**
 * Update user by ID
 * @param {String} id
 * @param {{ login: String, password: String, age: Number }} userData
 */
function updateUser(id, userData) {
    logger.info(`userService.updateUser, args: ${id}, ${JSON.stringify(userData)}`);

    const updateQuery = {};

    if (userData.login) updateQuery.login = userData.login;
    if (userData.password) updateQuery.password = userData.password;
    if (userData.age) updateQuery.age = userData.age;

    return User.update(updateQuery, {
        where: { id }
    });
}

/**
 * Delete user by ID
 * @param {String} id
 */
function deleteUser(id) {
    logger.info(`userService.deleteUser, args: ${id}`);

    return User.update({ isDeleted: true }, {
        where: { id }
    });
}

/**
 * Suggest users by `login`
 * @param {String} loginSubstring
 * @param {Number} limit
 */
async function autoSuggestUsers(loginSubstring, limit) {
    logger.info(`userService.autoSuggestUsers, args: ${loginSubstring}, ${limit}`);

    const users = await User.findAll({ raw: true });
    return users
        .reduce((result, { login, isdeleted }) => {
            const normalisedLogin = login.toLowerCase();
            const normalisedSearch = loginSubstring.toLowerCase();

            if (normalisedLogin.includes(normalisedSearch) && !isdeleted) {
                result.push(login);
            }

            return result;
        }, [])
        .sort()                // sort results
        .splice(0, limit);     // cut an array to a specified limit
}

module.exports = {
    findUser,
    createUser,
    updateUser,
    deleteUser,
    autoSuggestUsers
};
