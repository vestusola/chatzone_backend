'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    email: DataTypes.STRING,
    code: DataTypes.STRING
  }, {});
  PasswordReset.associate = function(models) {
    // associations can be defined here
    PasswordReset.belongsTo(models.User, {
      foreignKey: "email"
    });
  };
  return PasswordReset;
};