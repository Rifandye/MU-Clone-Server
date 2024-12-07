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

    const { page = 1, size = 10 } = req.query;

    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(size, 10);

    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize;

    try {
      const { count, rows: data } = await Merchandise.findAndCountAll({
        offset,
        limit,
        distinct: true,
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
        order: [['createdAt', 'DESC']],
      });

      const totalPages = Math.ceil(count / pageSize);

      const result = {
        totalItems: count,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        data: data,
      };

      response.success('Fetched successfully', result, 200);
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

  static async updateThumbnail(req, res, next) {
    const response = new Response(res);
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;

      const merchandise = await Merchandise.findByPk(id);

      if (!merchandise)
        throw { name: 'NotFound', message: 'Merchandise not found' };

      if (!req.file)
        throw { name: 'FileIsRequired', message: 'File is required' };

      const base64Image = req.file.buffer.toString('base64');
      const base64URL = `data:${req.file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(base64URL, {
        public_id: req.file.originalname,
      });

      if (!result || !result.secure_url) {
        throw { name: 'UploadError', message: 'Failed to upload thumbnail' };
      }

      await merchandise.update(
        { thumbnail: result.secure_url },
        { transaction: t },
      );

      const updatedMerchandise = await Merchandise.findByPk(id, {
        transaction: t,
      });

      await t.commit();

      response.success(
        'Upload thumbnail successfully',
        updatedMerchandise,
        200,
      );
    } catch (error) {
      console.log(error, 'error uploading thumbnail');
      await t.rollback();
      next(error);
    }
  }
};
