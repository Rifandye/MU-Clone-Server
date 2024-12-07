const express = require('express');
const router = express.Router();
const MerchandiseController = require('../controllers/MerchandiseController');
const validator = require('../middlewares/Validator');
const { createMerchandiseSchema } = require('../schemas/merchandiseSchema');

//! Uploading Image Feature Will Be Integrated In The Future
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

router.post(
  '/',
  createMerchandiseSchema,
  validator,
  MerchandiseController.createMerchandise,
);
router.get('/', MerchandiseController.getAllMerchandise);
router.get('/:slug', MerchandiseController.getMerchandiseBySlug);

module.exports = router;
