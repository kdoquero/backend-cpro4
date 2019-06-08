'use strict';
module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define('VerificationToken', {
    clientId: DataTypes.INTEGER,
    token: DataTypes.STRING
  }, {});
  VerificationToken.associate = function(models) {
    VerificationToken.belongsTo(models.Client, {
      as: "client",
      foreignKey: "clientId",
      foreignKeyConstraint: true
    });
  };
  return VerificationToken;
};