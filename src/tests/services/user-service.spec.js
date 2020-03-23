const userService = require('../../services/user-service');
const User = require('../../models/user');

const userId = 3;
const notExistUserId = 555;

const userData = { login: 'John', passwrod: 'John123@', age: 30, id: userId, is_deleted: false };
const requestData = { login: userData.login, password: userData.passwrod, age: userData.age };
const deletedUserData = { ...userData, ...{ is_deleted: true } };

const validLogin = userData.login;
const validPassword = userData.passwrod;

const invalidLogin = 'Mary';
const invalidPassword = 'Mary123^';

const users = [
    userData,
    { ...userData, ...{ login: 'David' } },
    { ...userData, ...{ login: 'Jonnie' } },
    { ...userData, ...{ login: 'Joseph' } }
];

const suggestionTerm = 'Jo';
const suggestionLimit = 2;

const suggestions = [
    users[0].login,
    users[2].login
];

jest.spyOn(User, 'findByPk').mockImplementation((id) => {
    if (id === userId) {
        return { get: () => userData };
    }

    return null;
});

jest.spyOn(User, 'findOne').mockImplementation(({ login, password }) => {
    if (login === userData.login && password === userData.passwrod) {
        return { get: () => userData };
    }

    return null;
});

jest.spyOn(User, 'create').mockImplementation(() => userData);
jest.spyOn(User, 'update').mockImplementation((query) => {
    if ('isDeleted' in query) {
        return deletedUserData;
    }

    return userData;
});

jest.spyOn(User, 'findAll').mockImplementation(() => {
    return users;
});

describe('userService', () => {
    describe('findUser()', () => {
        it('should return NULL if user not exists', async () => {
            const user = await userService.findUser(notExistUserId);
            expect(user).toEqual(null);
        });

        it('should return a user if it exists', async () => {
            const user = await userService.findUser(userId);
            expect(user).toEqual(userData);
        });
    });

    describe('findUserByCredentials()', () => {
        it('should return NULL if user not exists', async () => {
            const user = await userService.findUserByCredentials(invalidLogin, invalidPassword);
            expect(user).toEqual(null);
        });

        it('should return a user if exists', async () => {
            const user = await userService.findUserByCredentials(validLogin, validPassword);
            expect(user).toEqual(userData);
        });
    });

    describe('generateAuthToken()', () => {
        it('should return a valid token', async () => {
            const token = await userService.generateAuthToken(userId);
            expect(token).toBeTruthy();
        });
    });

    describe('createUser()', () => {
        it('should return a new user object', async () => {
            const user = await userService.createUser(requestData);
            expect(user).toEqual(userData);
        });
    });

    describe('updateUser()', () => {
        it('should return an updated user object', async () => {
            const user = await userService.updateUser(userId, requestData);
            expect(user).toEqual(userData);
        });
    });

    describe('deleteUser()', () => {
        it('should return an updated user object as deleted one', async () => {
            const user = await userService.deleteUser(userId);
            expect(user).toEqual(deletedUserData);
        });
    });

    describe('autoSuggestUsers()', () => {
        it('should return correct users list', async () => {
            const autoSuggestions = await userService.autoSuggestUsers(suggestionTerm, suggestionLimit);
            expect(autoSuggestions).toEqual(suggestions);
        });
    });
});
