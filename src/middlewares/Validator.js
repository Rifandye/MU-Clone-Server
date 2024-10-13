const { validationResult } = require('express-validator');
const Response = require('../utils/response');

const validator = (req, res, next) => {
  const response = new Response(res);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return response.error('Bad Request', errors.array(), 400);
  }
  next();
};

module.exports = validator;
