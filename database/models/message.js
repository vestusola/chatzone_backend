'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    user_id: DataTypes.BIGINT,
    friend_id: DataTypes.BIGINT,
    message: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM,
      values: ["sent", "delivered", "read"],
      defaultValue: "sent"
    }
  }, {});
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: "friend_id",
      target: "id"
    });

    Message.belongsTo(models.User, {
      foreignKey: "user_id",
      target: "id"
    });
  };
  return Message;
};