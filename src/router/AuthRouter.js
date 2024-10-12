const express = require('express');
const router = express.Router();
const AuthRouter = require('../controllers/AuthController');

router.post('/register', AuthRouter.register);
router.post('/login', AuthRouter.login);

module.exports = router;
