const { checkSchema } = require('express-validator');

const createCategorySchema = checkSchema({
  name: {
    notEmpty: {
      errorMessage: 'Category Name is required',
    },
  },
});

module.exports = { createCategorySchema };
