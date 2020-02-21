const Group = require('../models/group');

/**
 * Find all groups
 */
function findAllGroups() {
    return Group.findAll({ raw: true });
}

/**
 * Find group by ID
 * @param {Integer} id
 */
async function findGroup(id) {
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
    return Group.create(groupData);
}

/**
 * Update group by ID
 * @param {String} id
 * @param {{ name: String, permissions: String }} groupData
 */
function updateGroup(id, groupData) {
    const updateQuery = {};

    /**
     * Such check is a logical trap
     * Imagine the situation where you need to check numeric field but zero is also acceptable
     *
     * Consider to use typeof $VARIABLE$ === $TYPE$
     */
    if (groupData.name) updateQuery.login = groupData.name;
    if (groupData.permissions) updateQuery.password = groupData.permissions;

    return Group.update(updateQuery, {
        where: { id }
    });
}

/**
 * Delete group by ID
 * @param {String} id
 */
function deleteGroup(id) {
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
