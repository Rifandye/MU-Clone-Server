const express = require('express');
const router = express.Router();
const AuthRouter = require('./AuthRouter');
const MerchandiseRouter = require('./MerchandiseRouter');
const CategoryRouter = require('./CategoryRouter');
const { authentication } = require('../middlewares/Authentication');

router.use('/auth', AuthRouter);
router.use(authentication);
router.use('/merchandise', MerchandiseRouter);
router.use('/category', CategoryRouter);

module.exports = router;
