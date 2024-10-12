const Response = require('../utils/response');
const { User } = require('../models');

module.exports = class AuthController {
  static async register(req, res, next) {
    const response = new Response(res);

    try {
      const { firstName, lastName, email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user) throw { name: 'BadRequest', message: 'Email already taken' };

      const createdUser = await User.create({
        first_name: firstName,
        last_name: lastName,
        email,
        ...req.body,
      });

      const data = await User.findOne({
        where: { id: createdUser.id },
        exclude: ['password'],
      });

      response.success('User registered successfully', data, 200);
    } catch (error) {
      next(error);
    }
  }
};
