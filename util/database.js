const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodeapp', 'root', 'bbaral1015', {
        dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;


