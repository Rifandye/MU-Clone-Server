const { Category } = require('../models');
const Response = require('../utils/response');

module.exports = class CategoryController {
  static async getAllCategories(req, res, next) {
    const response = new Response(res);
    try {
      const { page = 1, size = 10 } = req.query;

      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(size, 10);

      const offset = (pageNumber - 1) * pageSize;
      const limit = pageSize;

      const { count, rows: data } = await Category.findAndCountAll({
        offset,
        limit,
      });

      const totalPages = Math.ceil(count / pageSize);

      const result = {
        totalItems: count,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        data: data,
      };

      response.success('Fetch Category Successfull', result, 200);
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(req, res, next) {
    const response = new Response(res);
    try {
      const createdCategory = await Category.create(req.body);

      const data = await Category.findOne({
        where: { id: createdCategory.id },
      });

      response.success('Category created successfully', data, 201);
    } catch (error) {
      next(error);
    }
  }
};
