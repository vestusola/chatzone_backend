'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMessage = sequelize.define('GroupMessage', {
    group_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT,
    message: DataTypes.TEXT
  }, {});
  GroupMessage.associate = function(models) {
    // associations can be defined here
    GroupMessage.belongsTo(models.Group, {
      foreignKey: "group_id"
    });

    GroupMessage.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    
  };
  return GroupMessage;
};