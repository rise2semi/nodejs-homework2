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
 * @return {(User|null)}
 */
function findUser(id) {
    return users.has(id) ? users.get(id) : null;
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
 * @return {User}
 */
function updateUser(id, userData) {
    /**
     * Funny of course but slightly error proned =)
     */
    const user = this.findUser(id);
    const updatedUser = { ...user, ...userData };
    users.set(updatedUser.id, updatedUser);

    return updatedUser;
}

// what about such case ?)
(() => updateUser(1, {}))();

/**
 * Delete user by ID
 * @param {String} id
 */
function deleteUser(id) {
    const user = this.findUser(id);
    user.isDeleted = true;
    users.set(user.id, user);

    return user;
}

/**
 * Suggest users by `login`
 * @param {String} loginSubstring
 * @param {Number} limit
 */
function autoSuggestUsers(loginSubstring, limit) {
    /**
     * For sure you could substitute three loops here by only one
     */
    return Array.from(users.values())
        .reduce((result, { login, isDeleted }) => {
            const normalisedLogin = login.toLowerCase();
            const normalisedSearch = loginSubstring.toLowerCase();

            if (normalisedLogin.includes(normalisedSearch) && !isDeleted) {
                result.push(login);
            }

            result.push(login);

            return result;
        })
        .sort()
        .splice(0, limit);

    // return [...users.values()]
    //     .filter(user => user.login.toLowerCase().includes(loginSubstring)) // check loginSubstring matches
    //     .filter(user => !user.isDeleted)                                   // exclude delete users
    //     .map(user => user.login)                                           // return just login property
    //     .sort()                                                            // sort results
    //     .splice(0, limit);                                                 // cut an array to a specified limit
}

module.exports = {
    findUser,
    createUser,
    updateUser,
    deleteUser,
    autoSuggestUsers
};
