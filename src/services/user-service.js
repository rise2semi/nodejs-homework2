const User = require('../models/user');

/**
 * Find user by ID
 * @param {Integer} id
 */
async function findUser(id) {
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
    return User.create(userData);
}

/**
 * Update user by ID
 * @param {String} id
 * @param {{ login: String, password: String, age: Number }} userData
 */
function updateUser(id, userData) {
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
