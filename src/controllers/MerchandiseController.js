const { Op } = require('sequelize');
const {
  Merchandise,
  Category,
  Merchandise_Categories,
  Image,
  sequelize,
} = require('../models');
const Response = require('../utils/response');

module.exports = class MerchandiseController {
  static async getAllMerchandise(req, res, next) {
    const response = new Response(res);
    try {
      const data = await Merchandise.findAll({
        include: [
          {
            model: Category,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: Image,
            attributes: ['id', 'url'],
          },
        ],
      });

      response.success('Fetched successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  static async getMerchandiseBySlug(req, res, next) {
    const response = new Response(res);
    try {
      const { slug } = req.params;

      const data = await Merchandise.findOne({
        where: { slug },
        include: [
          {
            model: Category,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: Image,
            attributes: ['id', 'url'],
          },
        ],
      });

      if (!data) throw { name: 'NotFound', message: 'Merchandise not found' };

      response.success('Fethed successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }

  static async createMerchandise(req, res, next) {
    const response = new Response(res);
    const t = await sequelize.transaction();
    try {
      const { name, description, slug, price, stock, categories } = req.body;

      const createdMerch = await Merchandise.create(
        {
          name,
          description,
          slug,
          price,
          stock,
        },
        {
          transaction: t,
        },
      );

      const foundCategories = await Category.findAll({
        where: {
          name: {
            [Op.in]: categories,
          },
        },
        attributes: ['id', 'name', 'createdAt', 'updatedAt'],
        transaction: t,
      });

      if (foundCategories.length === 0) {
        throw { name: 'NotFound', message: 'No valid categories found' };
      }

      const categoryIds = foundCategories.map((e) => {
        return e.id;
      });

      await Promise.all(
        categoryIds.map((categoryId) =>
          Merchandise_Categories.create(
            {
              merchandiseId: createdMerch.id,
              categoryId: categoryId,
            },
            { transaction: t },
          ),
        ),
      );

      const data = await Merchandise.findOne({
        where: { id: createdMerch.id },
        include: [
          {
            model: Category,
            through: { attributes: [] },
            attributes: ['id', 'name'],
          },
          {
            model: Image,
            attributes: ['id', 'url'],
          },
        ],
        transaction: t,
      });

      await t.commit();
      response.success('Merchandise created successfully', data, 201);
    } catch (error) {
      console.error('Transaction error:', error);
      await t.rollback();
      next(error);
    }
  }
};
