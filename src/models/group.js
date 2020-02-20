const { Sequelize, Model } = require('sequelize');
const sequelize = require('../data-access/db');

class Group extends Model {}

Group.init({
    name: { type: Sequelize.STRING, allowNull: false },
    permissions: { type: Sequelize.STRING, allowNull: false }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'group',
    tableName: 'groups'
});

module.exports = Group;
