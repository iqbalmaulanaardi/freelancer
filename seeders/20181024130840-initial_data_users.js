'use strict';
let dummy = [{
        name: 'Sendy Akbar',
        email: 'sendy@mail.com',
        phone_number: '081754561190',
        password: 'sendy',
        age: 20,
        gender: 'male',
        rating: 0,
        wallet: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Cristiano',
        email: 'ronaldo@mail.com',
        phone_number: '0827381923',
        password: 'cristiano',
        age: 34,
        gender: 'male',
        rating: 0,
        wallet: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        name: 'Kosasih',
        email: 'kosasih@mail.com',
        phone_number: '082137801212',
        password: 'kosasih',
        age: 22,
        gender: 'female',
        rating: 0,
        wallet: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('Person', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */
        return queryInterface.bulkInsert('Users', dummy, {});

    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          */
        return queryInterface.bulkDelete('Users', null, {});
    }
};