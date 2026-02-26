// routes/authRoutes.js
const express = require('express');
const router  = express.Router();
const { register, login } = require('../controllers/authController');

// full paths: /api/auth/register and /api/auth/login
router.post('/register', register);
router.post('/login', login);

module.exports = router;