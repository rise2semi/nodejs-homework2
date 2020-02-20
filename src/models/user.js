const { Sequelize, Model } = require('sequelize');
const sequelize = require('../data-access/db');

class User extends Model {}

User.init({
    login: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    is_deleted: { type: Sequelize.BOOLEAN }
}, {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'user',
    tableName: 'users'
});

module.exports = User;
