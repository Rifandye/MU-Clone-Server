const { Category } = require('../models');
const Response = require('../utils/response');

module.exports = class CategoryController {
  static async getAllCategories(req, res, next) {
    const response = new Response(res);
    try {
      const data = await Category.findAll();

      response.success('Fetch Category Successfull', data, 200);
    } catch (error) {
      next(error);
    }
  }
};
