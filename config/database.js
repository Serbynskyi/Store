const Sequelize = require('sequelize');

Database = new Sequelize('store', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    operatorAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});
module.exports = Database;