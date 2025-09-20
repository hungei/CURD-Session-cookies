const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/register', auth.showRegister);
router.post('/register', auth.register);

router.get('/login', auth.showLogin);
router.post('/login', auth.login);

router.post('/logout', auth.logout);

router.get('/forgot', auth.showForgot);
router.post('/forgot', auth.handleForgot);

router.get('/reset/:token', auth.showReset);
router.post('/reset/:token', auth.handleReset);

module.exports = router;
