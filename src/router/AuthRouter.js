const express = require('express');
const router = express.Router();
const AuthRouter = require('../controllers/AuthController');
const validator = require('../middlewares/Validator');
const { registerSchema, loginSchema } = require('../schemas/authSchema.js');

router.post('/register', registerSchema, validator, AuthRouter.register);
router.post('/login', loginSchema, validator, AuthRouter.login);

module.exports = router;
