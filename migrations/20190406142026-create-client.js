'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('Clients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique:true
      },
      name: {
        type: Sequelize.STRING,
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique:true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isAdmin: {
        type:Sequelize.BOOLEAN,
        defaultValue :false
      },
      avatar: {
        type:Sequelize.STRING,
        defaultValue :false
      },
      isVerified: {
        type:Sequelize.BOOLEAN,
        defaultValue :false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Clients');
  }
};