'use strict';
let dummy = [{
        name: 'Iqbal Maulana',
        password: 'iqbal',
        address: 'Bandung',
        email: 'iqbal@mail.com',
        phone_number: '081144565667',
        company: 'Hacktiv8',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Budi Harris',
        password: 'budi',
        address: 'Bali',
        email: 'budi@mail.com',
        phone_number: '081144561161',
        company: 'Facebook',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Andi Fariz',
        password: 'andi',
        address: 'Jakarta',
        email: 'andi@mail.com',
        phone_number: '081244510283',
        company: 'Google',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Owners', dummy, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Owners', null, {});
    }
};