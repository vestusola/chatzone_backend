/**
 * Send Reset Password Code
 */
exports.sendResetPasswordCode = function (fullname, code) {
  var html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Reset Password Notification</title>
        <style>
          html {
            margin: 0;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          .container {
            margin-right: 15px;
            margin-left: 15px;
            background: #f5f5f5;
            color: #000;
            border: 2px solid #ccc;
            border-radius: 5px 5px;
          }
          .header {
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #ccc;
            text-align: center;
          }
          .header img {
            margin-top: 15px;
            width: 50px;
            height: auto;
          }
          .img-circle {
            border-radius: 50%;
          }
          .img-rounded {
            border-radius: 5px 10px;
          }
          .body {
            margin-top: 10px;
            margin-right: 5px;
            margin-left: 5px;
            text-align: justify;
          }
          .footer {
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: #0c2461;
            color: #fff;
            font-size: 12px;
          }
          .body p:first-child {
            font-weight: 700;
          }
          .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
                touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
          }
          .btn:focus,
          .btn:active:focus,
          .btn.active:focus,
          .btn.focus,
          .btn:active.focus,
          .btn.active.focus {
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
          }
          .btn:hover,
          .btn:focus,
          .btn.focus {
            color: #333;
            text-decoration: none;
          }
          .btn:active,
          .btn.active {
            background-image: none;
            outline: 0;
            -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          }
          .btn-chat-zone {
            color: #fff;
            background-color: blue;
            border-color: #ccc;
          }
          .btn-chat-zone:focus,
          .btn-chat-zone.focus {
            color: #fff;
            background-color: blue;
            border-color: blue;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="body">
            <p>Hi ${fullname}</p>,
            <p style="text-indent: 15px;">There was a recent request to change the password of your account.</p>
            <p>Enter the code below to proceed.</p>
            <span style="text-align: center; font-size: 20px;">${code}</span>
            <br>
            <p>If you did not make this request. Please ignore.</p>
            <p>Thanks!</p>
          </div>
          <div class="footer">
            <p>Copyright &copy; ${ new Date().getFullYear()}. Chat Zone Team. <br /> All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;
  return html;
}

/**
 * Send Password Change Notification
 */
exports.sendPasswordChange = function (fullname) {
  var html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Password Notification</title>
        <style>
          html {
            margin: 0;
          }
          body {
            font-family: Arial, Helvetica, sans-serif;
          }
          .container {
            margin-right: 15px;
            margin-left: 15px;
            background: #f5f5f5;
            color: #000;
            border: 2px solid #ccc;
            border-radius: 5px 5px;
          }
          .header {
            height: 80px;
            line-height: 80px;
            border-bottom: 1px solid #ccc;
            text-align: center;
          }
          .header img {
            margin-top: 15px;
            width: 50px;
            height: auto;
          }
          .img-circle {
            border-radius: 50%;
          }
          .img-rounded {
            border-radius: 5px 10px;
          }
          .body {
            margin-top: 10px;
            margin-right: 5px;
            margin-left: 5px;
            text-align: justify;
          }
          .footer {
            height: 60px;
            line-height: 60px;
            text-align: center;
            background: #0c2461;
            color: #fff;
            font-size: 12px;
          }
          .body p:first-child {
            font-weight: 700;
          }
          .btn {
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: normal;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
                touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
               -moz-user-select: none;
                -ms-user-select: none;
                    user-select: none;
            background-image: none;
            border: 1px solid transparent;
            border-radius: 4px;
          }
          .btn:focus,
          .btn:active:focus,
          .btn.active:focus,
          .btn.focus,
          .btn:active.focus,
          .btn.active.focus {
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
          }
          .btn:hover,
          .btn:focus,
          .btn.focus {
            color: #333;
            text-decoration: none;
          }
          .btn:active,
          .btn.active {
            background-image: none;
            outline: 0;
            -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          }
          .btn-chat-zone {
            color: #fff;
            background-color: blue;
            border-color: #ccc;
          }
          .btn-chat-zone:focus,
          .btn-chat-zone.focus {
            color: #fff;
            background-color: blue;
            border-color: blue;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="body">
            <p>Hi ${fullname}</p>,
            <p style="text-indent: 15px;">Your password has been changed successfully. You can now login with your new password.</p>
            <p>Thanks!</p>
          </div>
          <div class="footer">
            <p>Copyright &copy; ${ new Date().getFullYear()}. Chat Zone Team. <br /> All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;
  return html;
}