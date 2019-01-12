'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    total: DataTypes.INTEGER,
    clientId:DataTypes.INTEGER
  }, {});
  ShoppingCart.associate = function(models) {
    ShoppingCart.belongsTo(models.Client)
    ShoppingCart.hasMany(models.Product,{through: {models:models.toBuy},foreignKey:'idShoppingCart'})

  };
  return ShoppingCart;
};