'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    total: DataTypes.INTEGER,
    clientId:DataTypes.INTEGER
  }, {});
  ShoppingCart.associate = function(models) {
    ShoppingCart.belongsTo(models.Client,{
      foreignKey: 'clientId'
    })
    ShoppingCart.hasMany(models.Product,{foreignKey: "id",targetKey: 'idProduct',onDelete: 'CASCADE'})
    ShoppingCart.hasMany(models.toBuy,{as: 'addToBuys',foreignKey: "idShoppingCart",targetKey: 'id',onDelete: 'CASCADE'})
  };
  return ShoppingCart;
};