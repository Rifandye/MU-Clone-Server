const express = require('express');
const router = express.Router();
const AuthRouter = require('./AuthRouter');
const MerchandiseRouter = require('./MerchandiseRouter');
const CategoryRouter = require('./CategoryRouter');
const PublicRouter = require('./PublicRouter');
const {
  authentication,
  authenticationForAdmin,
} = require('../middlewares/Authentication');

router.use('/auth', AuthRouter);
router.use('/public', PublicRouter);
router.use(authenticationForAdmin);
router.use('/merchandise', MerchandiseRouter);
router.use('/category', CategoryRouter);

module.exports = router;
