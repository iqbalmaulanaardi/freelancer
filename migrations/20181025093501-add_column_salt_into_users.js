'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'salt', { type: Sequelize.TEXT });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Users', 'salt')
    }
};