'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    display_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.TEXT
    },
    image_key: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.PasswordReset, {
      foreignKey: "email"
    });

    User.hasMany(models.UserFriends, {
      foreignKey: "user_id"
    });

    User.belongsToMany(models.Group, {
      through: models.GroupUser,
      foreignKey: 'user_id'
    });
  };
  return User;
};