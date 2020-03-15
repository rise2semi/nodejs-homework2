const Group = require('../models/group');
const logger = require('../config/logger');

/**
 * Find all groups
 */
function findAllGroups() {
    logger.info('groupService.findAllGroups');

    return Group.findAll({ raw: true });
}

/**
 * Find group by ID
 * @param {Integer} id
 */
async function findGroup(id) {
    logger.info(`groupService.findAllGroups, args: ${id}`);

    const group = await Group.findByPk(id);

    if (group) {
        return group.get({ plain: true });
    }

    return group;
}

/**
 * Create group
 * @param {{ name: String, permissions: String }} groupData
 */
function createGroup(groupData) {
    logger.info(`groupService.createGroup, args: ${JSON.stringify(groupData)}`);

    return Group.create(groupData);
}

/**
 * Update group by ID
 * @param {String} id
 * @param {{ name: String, permissions: String }} groupData
 */
function updateGroup(id, groupData) {
    logger.info(`groupService.updateGroup, args: ${id}, ${JSON.stringify(groupData)}`);

    const updateQuery = {
        login: groupData.name,
        permissions: groupData.permissions
    };

    return Group.update(updateQuery, {
        where: { id }
    });
}

/**
 * Delete group by ID
 * @param {String} id
 */
function deleteGroup(id) {
    logger.info(`groupService.updateGroup, args: ${id}`);

    return Group.destroy({
        where: { id }
    });
}

module.exports = {
    findAllGroups,
    findGroup,
    createGroup,
    updateGroup,
    deleteGroup
};
