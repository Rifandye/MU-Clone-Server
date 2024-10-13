const express = require('express');
const router = express.Router();
const MerchandiseController = require('../controllers/MerchandiseController');
const validator = require('../middlewares/Validator');
const { createMerchandiseSchema } = require('../schemas/merchandiseSchema');

router.post(
  '/',
  createMerchandiseSchema,
  validator,
  MerchandiseController.createMerchandise,
);
router.get('/', MerchandiseController.getAllMerchandise);
router.get('/:slug', MerchandiseController.getMerchandiseBySlug);

module.exports = router;
