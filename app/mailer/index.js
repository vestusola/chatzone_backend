/**
 |---------------------------------------------------------
 | Mailer
 |---------------------------------------------------------
 */
// Include required plugins
var sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// include mail templates
const templates = require('./templates');

class Mailer {
  /**
   * Send password reset link
   * @param {*} url
   * @param {*} code
   * @param {*} email
   */
  static async sendResetPasswordCode(fullname, code, email) {
    var message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: "PASSWORD RESET NOTIFICATION",
      html: templates.sendResetPasswordCode(fullname, code)
    };
    return sgMail.send(message);
  }

  static async sendPasswordChange(fullname, email) {
    var message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: "PASSWORD NOTIFICATION",
      html: templates.sendPasswordChange(fullname)
    };
    return sgMail.send(message);
  }
}

module.exports = Mailer;