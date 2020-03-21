'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupUsers', {
      group_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      role_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroupUsers');
  }
};