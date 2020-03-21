/**
 |---------------------------------------------------------
 | Login Controller
 |---------------------------------------------------------
 */
// Include modules or plugins
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let HTTP = require('./RequestController');
let randToken = require("rand-token");

// Include Models
let User = require('../../database/models').User;

require('dotenv').config();
let secret = process.env.JWT_SECRET;
let refreshTokens = {};

class LoginController {
  /**
   * Register User
   * @param {*} req
   * @param {*} res
   */
  static login(req, res) {
    try {
      // Request Form Data
      let email = req.body.email;
      let password = req.body.password;

      // Check if account is valid
      User.findOne({
        where: { email: email }
      }).then(isValidUser => {
        if (isValidUser) {
          // Verify password
          let verifyPassword = bcrypt.compareSync(password, isValidUser.password);
          if (verifyPassword) {
            var details = {
              id: isValidUser.id,
              email: isValidUser.email,
              fullname: isValidUser.fullname,
              is_auth: true,
              image: isValidUser.image,
              display_name: isValidUser.display_name
            };

            var token = jwt.sign({
              user: details
            }, secret, {
              expiresIn: '365d'
            });

            var refreshToken = randToken.uid(256);
            refreshTokens[refreshToken] = email;

            return HTTP.OK(res, {
              user: details,
              message: "Login successful.",
              token: token,
              refreshToken: refreshToken
            });
          } else {
            return HTTP.ERROR(res, 'Invalid Email or Password provided.');
          }
        } else {
          return HTTP.ERROR(res, 'Invalid Email or Password provided.');
        }
      }).catch(() => {
        return HTTP.FAILED(res);
      });
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }
}

module.exports = LoginController;