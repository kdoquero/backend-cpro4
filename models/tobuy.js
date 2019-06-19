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
    qty: DataTypes.INTEGER,
    idGiantBomb: DataTypes.STRING
  }, {});
  toBuy.associate = function(models) {
    toBuy.hasMany(models.Product,{foreignKey: "id",targetKey: 'idProduct',onDelete: 'CASCADE'})
    // associations can be defined here
  };
  return toBuy;
};