const Response = require('../utils/response');
const { User } = require('../models');
const { comparePass } = require('../utils/bcrypt');
const { signToken } = require('../utils/jwt');

module.exports = class AuthController {
  static async register(req, res, next) {
    const response = new Response(res);

    try {
      const { firstName, lastName, email } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user) throw { name: 'BadRequest', message: 'Email already taken' };

      const createdUser = await User.create({
        firstName,
        lastName,
        email,
        ...req.body,
      });

      const data = await User.findOne({
        where: { id: createdUser.id },
        exclude: ['password'],
      });

      response.success('User registered successfully', data, 201);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const response = new Response(res);
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user)
        throw { name: 'BadRequest', message: 'Invalid Email/Password' };

      const comparedPass = comparePass(password, user.password);

      if (!comparedPass)
        throw { name: 'BadRequest', message: 'Invalid Email/Password' };

      const access_token = signToken({ id: user.id });

      response.success('User login successfully', { access_token }, 200);
    } catch (error) {
      next(error);
    }
  }
};
