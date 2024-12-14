const express = require('express');
const MerchandiseController = require('../controllers/MerchandiseController');
const router = express.Router();

router.get('/merchandise', MerchandiseController.getAllMerchandise);
router.get('/merchandise/:slug', MerchandiseController.getMerchandiseBySlug);

module.exports = router;
