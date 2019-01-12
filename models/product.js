'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.ShoppingCart,{through: {models:models.toBuy},foreignKey:'idProduct'})
  };
  return Product;
};