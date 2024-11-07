const express = require('express');
const router = express.Router();
const MerchandiseController = require('../controllers/MerchandiseController');
const validator = require('../middlewares/Validator');
const { createMerchandiseSchema } = require('../schemas/merchandiseSchema');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/',
  upload.array('images', 5),
  createMerchandiseSchema,
  validator,
  MerchandiseController.createMerchandise,
);
router.get('/', MerchandiseController.getAllMerchandise);
router.get('/:slug', MerchandiseController.getMerchandiseBySlug);

module.exports = router;
