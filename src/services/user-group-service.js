const UserGroup = require('../models/user-group');
const sequelize = require('../data-access/db');
const logger = require('../config/logger');

/**
 * Add users to a group
 * @param {Number} groupId
 * @param {Array} userIds
 */
async function addUsersToGroup(groupId, userIds) {
    logger.info(`userGroupService.addUsersToGroup, args: ${groupId}, ${userIds}`);

    return sequelize.transaction(async (t) => {
        await userIds.forEach(async (userId) => {
            await UserGroup.create({ groupId, userId }, { transaction: t });
        });
    });
}

module.exports = {
    addUsersToGroup
};
