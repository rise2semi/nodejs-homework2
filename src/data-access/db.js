const { Sequelize } = require('sequelize');

require('dotenv').config();
const { DB_CONNECTION } = process.env;

module.exports = new Sequelize(DB_CONNECTION);
