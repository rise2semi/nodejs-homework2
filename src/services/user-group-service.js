const UserGroup = require('../models/user-group');
const sequelize = require('../data-access/db');

/**
 * Add users to a group
 * @param {Number} groupId
 * @param {Array} userIds
 */
async function addUsersToGroup(groupId, userIds) {
    return await sequelize.transaction(async (t) => {
        await userIds.forEach(async (userId) => {
            await UserGroup.create({ groupId, userId }, { transaction: t });
        });
    });
}

module.exports = {
    addUsersToGroup
};
