'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Projects', 'owner_id', { references: { model: 'Owners', key: 'id' }, type: Sequelize.INTEGER });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('Projects', 'owner_id');

    }
};