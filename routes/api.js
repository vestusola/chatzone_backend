/**
 |---------------------------------------------------------
 | API Routes
 | All routes end point comes here
 |---------------------------------------------------------
 */

// Include plugins and modules
let express = require('express');
let router = express.Router();
let AuthGuard = require('../app/auth');

// Include controllers
let RegisterController = require('../app/controllers/RegisterController');
let LoginController = require('../app/controllers/LoginController');
let PasswordController = require('../app/controllers/PasswordController');
let TokenController = require('../app/controllers/TokenController');
let UserController = require('../app/controllers/UserController');

// Register new user
router.post('/register', RegisterController.register);

// Login registered user
router.post('/login', LoginController.login);

// Request Forgot Password
router.post('/forgot_password', PasswordController.sendResetPasswordCode);

// Verify password code
router.post('/forgot_password/verify', PasswordController.verifyPasswordCode);

// Change user password
router.put('/change_password/password', PasswordController.changeUserPassword);

// Refresh authentication token
router.get('/token/refresh', AuthGuard, TokenController.refreshToken);

// Delete refresh token
router.post('/token/delete', AuthGuard, TokenController.deleteRefreshToken);

// Add friend from contact
router.post('/people/request', AuthGuard, UserController.addFriendFromContact);

module.exports = router;