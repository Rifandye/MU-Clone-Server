const { checkSchema } = require('express-validator');

const createMerchandiseSchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Merchandise Name is required',
    },
  },
  description: {
    notEmpty: {
      errorMessage: 'Merchandise Description is required',
    },
  },
  slug: {
    notEmpty: {
      errorMessage: 'Merchandise Slug is required',
    },
  },
  price: {
    notEmpty: {
      errorMessage: 'Merchandise Price is required',
    },
  },
  stock: {
    notEmpty: {
      errorMessage: 'Merchandise Stock is required',
    },
  },
  categories: {
    isArray: {
      errorMessage: 'Categories must be an array',
    },
  },
});

module.exports = { createMerchandiseSchema };
