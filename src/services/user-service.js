const User = require('../models/user');

/**
 * Find user by ID
 * @param {Integer} id
 * @param {Function} callback
 * @param {Boolean} raw
 */
/**
 * You may use async/await syntax here
 * just return a promise from the function and await it =)
 *
 * Service should not return anything like status code because it is piece of business login
 * and it's unaware about an approach of communication with an end user. In this case you may test and use your
 * service independently from you 'connection/routing layer'
 *
 * Conceptually your services are core of business login and routes just glue between end user and your
 * business logic. So services can't know about approach of communications with an end user
 * this responsibility should be offloaded to 'connection/routing layer'
 *
 * Pattern from Martin Fowler - https://www.martinfowler.com/eaaCatalog/remoteFacade.html
 */
async function findUser(id, callback, raw) {
    // if you want to preserve back compatibility
    if (callback) {
        return User.findByPk(id)
            .then((user) => {
                if (!user) {
                    // bad idea
                    return callback({ status: 404, message: 'Cannot find a user' });
                }

                callback(null, (raw) ? user : user.get({ plain: true }));
            })
            .catch((err) => {
                callback(err.status);
            });
    }

    let result = await User.findByPk(id);
    if (result && raw) {
        result = result.get({ plain: true });
    }

    return result;
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
async function updateUser(id, userData) {
    const updateQuery = {};

    if (userData.login) updateQuery.login = userData.login;
    if (userData.password) updateQuery.password = userData.password;
    if (userData.age) updateQuery.age = userData.age;

    /**
     * One operation - just update =)
     */
    return User.update(updateQuery, {
        where: { id }
    });
    // findUser(id, (err, user) => {
    //     if (err) {
    //         return callback(err);
    //     }
    //
    //     console.log(user);
    //
    //     user.login = userData.login;
    //     user.password = userData.password;
    //     user.age = userData.age;
    //     user.save();
    //
    //     callback(null, user.get({ plain: true }));
    // }, true);
}

/**
 * Delete user by ID
 * @param {String} id
 * @param {Function} callback
 */
function deleteUser(id) {
    return User.update({ isDeleted: true }, {
        where: {
            id
        }
    });
    // findUser(id, (err, user) => {
    //     if (err) {
    //         return callback(err);
    //     }
    //
    //     user.isdeleted = true;
    //     user.save();
    //
    //     callback();
    // }, true);
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
