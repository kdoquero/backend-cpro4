'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn(
    'toBuys',
    'idGiantBomb', {
      type: Sequelize.STRING
    }

  )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'toBuys',
      'idGiantBomb')
    
  }
};
