'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Clients',
      'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Clients',
      'isVerified'

    )
  }
};
