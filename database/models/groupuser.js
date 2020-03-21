'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupUser = sequelize.define('GroupUser', {
    group_id: DataTypes.BIGINT,
    role_id: DataTypes.BIGINT,
    user_id: DataTypes.BIGINT
  }, {});
  GroupUser.associate = function(models) {
    // associations can be defined here
    GroupUser.belongsTo(models.User, {
      foreignKey: "user_id"
    });

    GroupUser.belongsTo(models.Group, {
      foreignKey: "group_id"
    });

    GroupUser.belongsTo(models.Role, {
      foreignKey: "role_id"
    });
  };
  return GroupUser;
};