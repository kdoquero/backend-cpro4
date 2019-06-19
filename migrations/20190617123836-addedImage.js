'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Products',
        'image', {
          type: Sequelize.TEXT("long")
        }

      ),
      queryInterface.addColumn(
        'Products',
        'idGiantBomb', {
          type: Sequelize.STRING
        }

      ),
      queryInterface.addColumn(
        'Products',
        'deck', {
          type: Sequelize.TEXT("long")
        }

      )
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Products',
        'image'
      ),
      queryInterface.removeColumn(
        'Products',
        'idGiantBomb'

      ),
      queryInterface.removeColumn(
        'Products',
        'deck'
      )
    ]);
  }
};
