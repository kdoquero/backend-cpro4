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
          type: Sequelize.INTEGER
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
        'image', {
          type: Sequelize.TEXT("long")
        }

      ),
      queryInterface.removeColumn(
        'Products',
        'idGiantBomb', {
          type: Sequelize.INTEGER
        }

      ),
      queryInterface.removeColumn(
        'Products',
        'deck', {
          type: Sequelize.TEXT("long")
        }

      )
    ]);
  }
};
