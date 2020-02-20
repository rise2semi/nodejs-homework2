const { Sequelize, Model } = require('sequelize');
const sequelize = require('../data-access/db');
const User = require('./user');
const Group = require('./group');

class UserGroup extends Model {}

UserGroup.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'userGroup',
    tableName: 'usergroup'
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

module.exports = UserGroup;
