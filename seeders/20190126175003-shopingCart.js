'use strict';
let models = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let shoppingCart = [];
    console.log("who");
    
    return models.Clients.findAll().then(client => {
      for (let index = 0; index < client.length; index++) {
        const i = 200 + client[index].id;
        //const picture = `https://picsum.photos/${200 + i}`;
        shoppingCart.push({
          total: Math.floor(Math.random() * Math.floor(200)),
          clientId: client[index].id,
        })


      }
     console.log(shoppingCart);
     
      return queryInterface.bulkInsert('ShoppingCarts', shoppingCart, {})
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
