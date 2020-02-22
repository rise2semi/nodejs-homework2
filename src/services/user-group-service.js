const UserGroup = require('../models/user-group');
const sequelize = require('../data-access/db');

/**
 * Add users to a group
 * @param {Number} groupId
 * @param {Array} userIds
 */
async function addUsersToGroup(groupId, userIds) {
    /**
     * I think here you might not await for the promise to resolve because outer code will do the same
     * thus you might just return something that will return a promise =)
     */
    // return await sequelize.transaction(async (t) => {
    return sequelize.transaction(async (t) => {
        /**
         * Just an another approach =)
         * SQL databases give you possibility to perform bulk operations that work with multiple records simultaneously
         */
        await UserGroup.bulkCreate(
            userIds.map(userId => ({ groupId, userId })),
            { transaction: t },
        );
        // await userIds.forEach(async (userId) => {
        //     await UserGroup.create({ groupId, userId }, { transaction: t });
        // });
    });
}

module.exports = {
    addUsersToGroup
};
