const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const { createCategorySchema } = require('../schemas/categorySchema');
const validator = require('../middlewares/Validator');

router.get('/', CategoryController.getAllCategories);
router.post(
  '/',
  createCategorySchema,
  validator,
  CategoryController.createCategory,
);

module.exports = router;
