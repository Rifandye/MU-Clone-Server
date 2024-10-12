const Response = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  const response = new Response(res);
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      response.error('Internal server error', err.errors[0].message, 400);
      break;
    case 'BadRequest':
      response.error('Bad Request', err.message, 400);
      break;
    case 'InvalidToken':
      response.error('Unauthorized', 'Invalid Token', 401);
      break;
    default:
      break;
  }
};

module.exports = errorHandler;
