const { Sequelize, Model } = require('sequelize');
const sequelize = require('../data-access/db');

class User extends Model {}

User.init({
    login: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    isdeleted: { type: Sequelize.BOOLEAN }
}, {
    sequelize,
    timestamps: false,
    modelName: 'user',
    tableName: 'users'
});

module.exports = User;
