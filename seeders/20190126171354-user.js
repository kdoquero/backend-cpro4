'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    let clients = [];
    for (let index = 0; index < 15; index++) {
      if (index == 0) {      
        clients.push({
          email: `johnDoe${index + 1}@mail.com`,
          password: bcrypt.hashSync(`pass${index + 1}`, 12),
          name: `jon${index + 1}`,
          isAdmin: true
        })
      } else {
        clients.push({
          email: `johnDoe${index + 1}@mail.com`,
          password: bcrypt.hashSync(`pass${index + 1}`, 12),
          name: `jon${index + 1}`,
          isAdmin: false

        })
      }
    }
    console.log(clients);
    
    return queryInterface.bulkInsert('Clients', clients, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Clients', null, {});
  }
};
