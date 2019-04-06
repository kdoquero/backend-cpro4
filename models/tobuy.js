'use strict';
module.exports = (sequelize, DataTypes) => {
  const toBuy = sequelize.define('toBuy', {
    idProduct:{
      primaryKey: true,
      type: DataTypes.INTEGER,
      
    },
    idShoppingCart:{
      primaryKey: true,
      type: DataTypes.INTEGER
    } ,
    qty: DataTypes.INTEGER
  }, {});
  toBuy.associate = function(models) {
    // associations can be defined here
  };
  return toBuy;
};