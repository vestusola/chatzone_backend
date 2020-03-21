/**
 |---------------------------------------------------------
 | Token Controller
 |---------------------------------------------------------
 */
// Include modules or plugins
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let HTTP = require('./RequestController');

// Include Models
let User = require('../../database/models').User;

require('dotenv').config();
let secret = process.env.JWT_SECRET;
let refreshTokens = {};

class TokenController {
  /**
   * Refresh authentication token
   * @param {*} req
   * @param {*} res
   */
  static refreshToken(req, res) {
    try {
      // Request Form Data
      let email = req.body.email;
      let refreshToken = req.body.refreshToken;

      if ((refreshToken in refreshTokens) && refreshTokens[refreshToken] == email) {
        // Get user details
        User.findOne({ where: { email: email }}).then(isValidUser => {
          if (isValidUser) {
            var details = {
              id: isValidUser.id,
              email: isValidUser.email,
              is_auth: true,
              fullname: isValidUser.fullname,
              display_name: isValidUser.display_name
            };

            var token = jwt.sign({
              user: details
            }, secret, {
              expiresIn: '365d'
            });

            return HTTP.OK(res, {
              user: details,
              token: token
            });
          } else {
            return HTTP.ERROR(res, 'Request failed. Try again later.');
          }
        }).catch(() => {
          return HTTP.FAILED(res);
        });
      } else {
        return HTTP.FAILED(res);    
      }
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }

  /**
   * Delete refresh token
   * @param {*} req
   * @param {*} res
   */
  static deleteRefreshToken(req, res) {
    try {
      // Check authentication
      let auth = req.decoded.user.is_auth;
      if (auth == true) {
        // Request Form Data
        let refreshToken = req.body.refreshToken;

        if(refreshToken in refreshTokens) { 
          delete refreshTokens[refreshToken]
        }

        return HTTP.OK(res, 'Refresh Token deleted');
      } else {
        return HTTP.ERROR(res, "Unauthorized access.");
      }
    } catch(error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }
}

module.exports = TokenController;