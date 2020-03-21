/**
 |---------------------------------------------------------
 | Register Controller
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

class RegisterController {
  /**
   * Register User
   * @param {*} req
   * @param {*} res
   */
  static register(req, res) {
    try {
      // Request Form Data
      let fullname = req.body.fullname;
      let email = req.body.email.toLowerCase();
      let phone = req.body.phone;
      let password = req.body.password;

      // Encrypt password
      let hashedPassword = bcrypt.hashSync(password);

      // Check if account already exist
      User.findOne({
        where: { email: email }
      }).then(emailExist => {
        if (emailExist) {
          return HTTP.ALREADY_EXIST(res, 'Email already exist!');
        } else {
          User.findOne({ where: { phone: phone } }).then(phoneExist => {
            if (phoneExist) {
              return HTTP.ALREADY_EXIST('Phone already exist');
            } else {
              // Create User account
              User.create({
                fullname: fullname,
                email: email,
                phone: phone,
                password: hashedPassword
              }).then(created => {
                if (created) {
                  var details = {
                    id: created.id,
                    email: created.email,
                    is_auth: true,
                    image:created.image,
                    fullname: created.fullname,
                    display_name: created.display_name
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
                    message: "Registration was successful.",
                    token: token,
                    refreshToken: refreshToken
                  });
                } else {
                  return HTTP.ERROR(res, 'Unable to register user. Try again later.');
                }
              }).catch(() => {
                return HTTP.FAILED(res);
              });
            }
          }).catch(() => {
            return HTTP.FAILED(res);
          });
        }
      }).catch(() => {
        return HTTP.FAILED(res);
      });
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }
}

module.exports = RegisterController;