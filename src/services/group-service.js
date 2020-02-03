const Group = require('../models/group');

/**
 * Find all groups
 * @param {Function} callback
 */
function findAllGroups(callback) {
    Group.findAll({ raw: true })
        .then((groups) => {
            if (!groups) {
                return callback({ status: 404, message: 'Cannot retrieve the groups' });
            }

            callback(null, groups);
        })
        .catch((err) => {
            callback(err.status);
        });
}

/**
 * Find group by ID
 * @param {Integer} id
 * @param {Function} callback
 * @param {Boolean} raw
 */
function findGroup(id, callback, raw) {
    Group.findByPk(id)
        .then((group) => {
            if (!group) {
                return callback({ status: 404, message: 'Cannot find a group' });
            }

            callback(null, (raw) ? group : group.get({ plain: true }));
        })
        .catch((err) => {
            callback(err.status);
        });
}

/**
 * Create group
 * @param {{ name: String, permissions: String }} groupData
 * @param {Function} callback
 */
function createGroup(groupData, callback) {
    Group.create(groupData)
        .then((group) => {
            callback(null, group);
        })
        .catch(err => {
            callback(err);
        });
}

/**
 * Update group by ID
 * @param {String} id
 * @param {{ name: String, permissions: String }} groupData
 * @param {Function} callback
 */
function updateGroup(id, groupData, callback) {
    findGroup(id, (err, group) => {
        if (err) {
            return callback(err);
        }

        group.name = groupData.login;
        group.permissions = groupData.permissions;
        group.save();

        callback(null, group.get({ plain: true }));
    }, true);
}


/**
 * Delete group by ID
 * @param {String} id
 * @param {Function} callback
 */
function deleteGroup(id, callback) {
    findGroup(id, (err, group) => {
        if (err) {
            return callback(err);
        }

        group.remove();

        callback();
    }, true);
}


module.exports = {
    findAllGroups,
    findGroup,
    createGroup,
    updateGroup,
    deleteGroup
};
