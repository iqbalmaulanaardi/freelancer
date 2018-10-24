'use strict';
let dummy = [{
        title: 'Monitoring',
        description: 'Monitoring for administration',
        budget: 200000,
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Complete Data',
        description: 'Complete Data for transformation engine',
        budget: 100000,
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: 'Create Review',
        description: 'Create good review in e-commerce web over 4000 data',
        budget: 75000,
        deadline: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Projects', dummy, {});

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Projects', null, {});
    }
};