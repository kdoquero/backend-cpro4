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
    ShoppingCart.belongsTo(models.Client)
    //ShoppingCart.hasMany(models.Product,{through: models.toBuy,foreignKey: "idShoppingCart",onDelete: 'CASCADE'})

  };
  return ShoppingCart;
};