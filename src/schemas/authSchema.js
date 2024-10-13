const { checkSchema } = require('express-validator');

const registerSchema = checkSchema({
  firstName: {
    notEmpty: {
      errorMessage: 'First Name is required',
    },
  },
  lastName: {
    notEmpty: {
      errorMessage: 'Last Name is required',
    },
  },
  email: {
    isEmail: {
      errorMessage: 'Valid email is required',
    },
    notEmpty: {
      errorMessage: 'Email is required',
    },
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters long',
    },
  },
  role: {
    optional: true,
  },
});

const loginSchema = checkSchema({
  email: {
    notEmpty: {
      errorMessage: 'Email is required',
    },
    isEmail: {
      errorMessage: 'Valid email is required',
    },
  },

  password: {
    notEmpty: {
      errorMessage: 'Password is required',
    },
  },
});

module.exports = { registerSchema, loginSchema };
