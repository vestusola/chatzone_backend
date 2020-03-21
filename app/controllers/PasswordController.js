/**
 |---------------------------------------------------------
 | Password Controller
 |---------------------------------------------------------
 */
// Include modules or plugins
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let HTTP = require('./RequestController');
let helpers = require('./HelperController');
let Mailer = require('../mailer');

// Include Models
let User = require('../../database/models').User;
let PasswordReset = require("../../database/models").PasswordReset;

require('dotenv').config();

class PasswordController {
  /**
   * Send Reset Password Code
   * to User
   * @param {*} req
   * @param {*} res
   */
  static sendResetPasswordCode(req, res) {
    try {
      // Request Form Data
      let email = req.body.email;

      // Check if email is valid
      User.findOne({ where: { email: email } }).then(user => {
        if (user) {
          // Generate code
          let code = helpers.random(6);

          // Check if user already requested for a code
          PasswordReset.findOne({ where: { email: user.email } }).then(passwordReset => {
            if (passwordReset) {
              PasswordReset.create({
                email: user.email,
                code: code
              }).then(async saved => {
                if (saved) {
                  try {
                    // Send mail
                    await Mailer.sendResetPasswordCode(user.fullname, code, user.email);
                    await PasswordReset.destroy({ where: { id: passwordReset.id } });
                  } catch (error) {
                    return HTTP.ERROR(res, 'Unable to send mail. Try again later.');
                  }
                  return HTTP.OK(res, { message: 'Mail successfully sent.', data: true });
                } else {
                  return HTTP.FAILED(res);
                }
              }).catch(() => {
                return HTTP.FAILED(res);
              })
            } else {
              PasswordReset.create({
                email: user.email,
                code: code
              }).then(async saved => {
                if (saved) {
                  try {
                    // Send mail
                    await Mailer.sendResetPasswordCode(user.fullname, code, user.email);
                  } catch (error) {
                    return HTTP.ERROR(res, 'Unable to send mail. Try again later.')
                  }
                  return HTTP.OK(res, { message: 'Mail successfully sent.', data: true });
                } else {
                  return HTTP.FAILED(res);
                }
              }).catch(() => {
                return HTTP.FAILED(res);
              });
            }
          }).catch(() => {
            return HTTP.FAILED(res);
          });
        } else {
          return HTTP.ERROR(res, 'We can\'t find a user associated with the email provided.');
        }
      }).catch(() => {
        return HTTP.FAILED(res);
      })
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }

  /**
   * Verify password code
   * @param {*} req
   * @param {*} res
   */
  static verifyPasswordCode(req, res) {
    try {
      // Request Form Data
      let code = req.body.code;

      // Check if code is valid
      PasswordReset.findOne({ where: { code: code } }).then(isValid => {
        if (isValid) {
          return HTTP.OK(res, { message: 'verified', data: true });
        } else {
          return HTTP.ERROR(res, 'Wrong verification code.');
        }
      }).catch(() => {
        return HTTP.FAILED(res);
      })
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }

  /**
   * Change user password
   * @param {*} req
   * @param {*} res
   */
  static changeUserPassword(req, res) {
    try {
      // Request Form Data
      let code = req.body.code;
      let password = req.body.password;

      // Get user email
      PasswordReset.findOne({ where: { code: code } }).then(passwordReset => {
        if (passwordReset) {
          // Encrypt new password
          let hashedPassword = bcrypt.hashSync(password);

          // Update user password
          User.update(
            {
              password: hashedPassword
            },
            {
              where: { email: passwordReset.email }
            }
          ).then(async updated => {
            if (updated) {
              await PasswordReset.destroy({ where: { code: code } });
              return HTTP.UPDATED(res, 'Password successfully changed.')
            } else {
              return HTTP.FAILED(res);
            }
          }).catch(() => {
            return HTTP.FAILED(res);
          })
        } else {
          return HTTP.NOTFOUND(res);
        }
      }).catch(() => {
        return HTTP.FAILED(res);
      })
    } catch (error) {
      return HTTP.NETWORK_ERROR(res);
    }
  }
}

module.exports = PasswordController;