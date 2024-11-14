const { Op } = require('sequelize');
const {
  Merchandise,
  Category,
  Merchandise_Categories,
  Image,
  sequelize,
} = require('../models');
const Response = require('../utils/response');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      const file = req.file;

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

      const base64Image = req.file.buffer.toString('base64');
      const base64URL = `data:${file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(base64URL, {
        public_id: file.originalname,
      });

      const createdThumbnail = await Image.create(
        { url: result.secure_url, MerchandiseId: createdMerch.id },
        { transaction: t },
      );

      await Merchandise.update(
        { thumbnail: createdThumbnail.url },
        { where: { id: createdMerch.id }, transaction: t },
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
