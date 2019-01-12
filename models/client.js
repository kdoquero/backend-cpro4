'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {isEmail: true}
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  Client.associate = function(models) {
    Client.hasOne(models.ShoppingCart,{foreignKey:"clientId",foreignKeyConstraint:true})
  };
  return Client;
};