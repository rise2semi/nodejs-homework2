const { Sequelize, Model } = require('sequelize');
const sequelize = require('../data-access/db');

class User extends Model {}

User.init({
    login: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    age: { type: Sequelize.INTEGER, allowNull: false },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        // you could use such option
        // - https://sequelize.readthedocs.io/en/2.0/docs/models-definition/
        field: 'isdeleted'
    }
}, {
    sequelize,
    timestamps: false,
    modelName: 'user',
    tableName: 'users'
});

module.exports = User;
