'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('ProjectUsers', 'status', { type: Sequelize.TEXT });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('ProjectUsers', 'status')
    }
};