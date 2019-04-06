'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.ShoppingCart,{ as: 'toBuysProducts', through: models.toBuy,foreignKey: 'idProduct',otherKey:"id",onDelete: 'CASCADE'})
    // associations can be defined here
  };
  return Product;
};