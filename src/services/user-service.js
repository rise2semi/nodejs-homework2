const User = require('../models/user');

/**
 * Find user by ID
 * @param {Integer} id
 * @param {Function} callback
 * @param {Boolean} raw
 */
function findUser(id, callback, raw) {
    User.findByPk(id)
        .then((user) => {
            if (!user) {
                return callback({ status: 404, message: 'Cannot find a user' });
            }

            callback(null, (raw) ? user : user.get({ plain: true }));
        })
        .catch((err) => {
            callback(err.status);
        });
}

/**
 * Create user
 * @param {{ login: String, password: String, age: Number }} userData
 * @param {Function} callback
 */
function createUser(userData, callback) {
    User.create(userData)
        .then((user) => {
            callback(null, user);
        })
        .catch(err => {
            callback(err);
        });
}

/**
 * Update user by ID
 * @param {String} id
 * @param {{ login: String, password: String, age: Number }} userData
 * @param {Function} callback
 */
function updateUser(id, userData, callback) {
    findUser(id, (err, user) => {
        if (err) {
            return callback(err);
        }

        console.log(user);

        user.login = userData.login;
        user.password = userData.password;
        user.age = userData.age;
        user.save();

        callback(null, user.get({ plain: true }));
    }, true);
}

/**
 * Delete user by ID
 * @param {String} id
 * @param {Function} callback
 */
function deleteUser(id, callback) {
    findUser(id, (err, user) => {
        if (err) {
            return callback(err);
        }

        user.isdeleted = true;
        user.save();

        callback();
    }, true);
}

/**
 * Suggest users by `login`
 * @param {String} loginSubstring
 * @param {Number} limit
 * @param {Function} callback
 */
function autoSuggestUsers(loginSubstring, limit, callback) {
    User.findAll({ raw: true })
        .then((users) => {
            const suggestedUsers = users
                .reduce((result, { login, isdeleted }) => {
                    const normalisedLogin = login.toLowerCase();
                    const normalisedSearch = loginSubstring.toLowerCase();

                    if (normalisedLogin.includes(normalisedSearch) && !isdeleted) {
                        result.push(login);
                    }

                    return result;
                }, [])
                .sort()                          // sort results
                .splice(0, limit);               // cut an array to a specified limit

            console.log(suggestedUsers);
            callback(null, suggestedUsers);
        })
        .catch((err) => {
            callback(err);
        });
}

module.exports = {
    findUser,
    createUser,
    updateUser,
    deleteUser,
    autoSuggestUsers
};
