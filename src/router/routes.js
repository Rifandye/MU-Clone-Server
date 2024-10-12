const express = require('express');
const router = express.Router();
const AuthRouter = require('./AuthRouter');
const { authentication } = require('../middlewares/Authentication');

router.use('/auth', AuthRouter);
router.use(authentication);

module.exports = router;
