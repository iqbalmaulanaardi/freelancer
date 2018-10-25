'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Owners', 'salt', { type: Sequelize.TEXT });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Owners', 'salt')
    }
};