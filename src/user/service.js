const uuid = require('uuid/v1');

// Create users map
const users = new Map();

// Class to represent a user
class User {
    constructor({ login, password, age }) {
        this.id = uuid();
        this.isDeleted = false;

        this.login = login;
        this.password = password;
        this.age = age;
    }
}

/**
 * Find user by ID
 * @param {UUID} id
 * @param {Function} callback
 */
function findUser(id, callback) {
    if (!users.has(id)) {
        return callback({ status: 404, message: 'Cannot find a user' });
    }

    callback(null, users.get(id));
}

/**
 * Create user
 * @param {{ login: String, password: String, age: Number }} userData
 * @return {User}
 */
function createUser(userData) {
    const user = new User(userData);
    users.set(user.id, user);

    return user;
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

        const updatedUser = { ...user, ...userData };
        users.set(updatedUser.id, updatedUser);

        callback(null, updatedUser);
    });
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

        user.isDeleted = true;
        users.set(user.id, user);

        callback();
    });
}

/**
 * Suggest users by `login`
 * @param {String} loginSubstring
 * @param {Number} limit
 */
function autoSuggestUsers(loginSubstring, limit) {
    return [...users.values()]
        .reduce((result, { login, isDeleted }) => {
            const normalisedLogin = login.toLowerCase();
            const normalisedSearch = loginSubstring.toLowerCase();

            if (normalisedLogin.includes(normalisedSearch) && !isDeleted) {
                result.push(login);
            }

            return result;
        }, [])
        .sort()                                                            // sort results
        .splice(0, limit);                                                 // cut an array to a specified limit
}

module.exports = {
    findUser,
    createUser,
    updateUser,
    deleteUser,
    autoSuggestUsers
};
