'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Clients',
      'avatar'

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Clients',
      'avatar', {
        type: Sequelize.STRING,
      }

    )
  }
};
