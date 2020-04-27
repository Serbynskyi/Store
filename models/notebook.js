const Sequelize = require('sequelize');
const Database = require('../config/database');

const Notebookmodel = Database.define('notebooks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    vendor: {
        type: Sequelize.STRING
    },
    cpu: {
        type: Sequelize.STRING
    },
    display: {
        type: Sequelize.INTEGER
    }
})

module.exports = Notebookmodel;