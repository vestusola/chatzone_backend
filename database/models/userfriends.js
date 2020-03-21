'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFriends = sequelize.define('UserFriends', {
    user_id: DataTypes.BIGINT,
    friend_id: DataTypes.BIGINT
  }, {});
  UserFriends.associate = function(models) {
    // associations can be defined here
    UserFriends.belongsTo(models.User, {
      foreignKey: "user_id"
    });
    
  };
  return UserFriends;
};