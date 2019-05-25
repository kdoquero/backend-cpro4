'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Clients',
      'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Clients',
      'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }

    )
  }
}