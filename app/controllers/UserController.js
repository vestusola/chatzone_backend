/**
 |---------------------------------------------------------
 | User Controller
 |---------------------------------------------------------
 */
// Include modules or plugins
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let HTTP = require('./RequestController');
let Sequelize = require('sequelize');
let Op = Sequelize.Op;

// Include Models
let User = require('../../database/models').User;
let UserFriends = require('../../database/models').UserFriends;

require('dotenv').config();
let secret = process.env.JWT_SECRET;

class UserController {
  /**
   * Add registered users automatically
   * from contact
   * by email or phone
   * @param {*} req
   * @param {*} res
   */
  static addFriendFromContact(req, res) {
    try {
      // Check authentication
      let auth = req.decoded.user.is_auth;
      if (auth == true) {
        // Get account ID
        let userID = req.decoded.user.id;

        // Request Form Data
        let email = req.body.email.toLowerCase().trim();
        let phone = req.body.phone.trim();

        // Check if account is valid
        User.findOne({
          where: {
            [Op.or]: [
              Sequelize.where(Sequelize.fn('lower', Sequelize.col('email')), '=', email),
              Sequelize.where(Sequelize.col('phone'), '=', phone),
            ]
          }
        }).then(user => {
          if (user) {
            // Check if user is already logged in user friend
            UserFriends.findOne({
              where: {
                user_id: userID,
                friend_id: user.id
              }
            }).then(isFriend => {
              if (isFriend) {
                return HTTP.OK(res, { data: user });
              } else {
                UserFriends.create({
                  user_id: userID,
                  friend_id: user.id
                }).then(friendAdded => {
                  if (friendAdded) {
                    return HTTP.OK(res, { data: user });
                  } else {
                    return HTTP.OK(res, { data: null });
                  }
                }).catch(() => {
                  return HTTP.FAILED(res);
                });
              }
            }).catch(() => {
              return HTTP.FAILED(res);
            })
          } else {
            return HTTP.OK(res, { data: null });
          }
        }).catch(() => {
          return HTTP.FAILED(res);
        });
      } else {
        return HTTP.NOT_AUTHORIZED(res);
      }
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }
}

module.exports = UserController;