const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const UserService = require('../services/user-service');

class UserController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { name, email, password } = req.body;
      const userData = await UserService.register(name, email, password);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userData = await UserService.getUserById(id, userId);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async currentUser(req, res, next) {
    try {
      const userId = req.user.id;
      const userData = await UserService.current(userId);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      if (id !== req.user.id) {
        return next(ApiError.Forbidden());
      }
      const { email, name, dateOfBirth, bio, location } = req.body;
      const errors = validationResult(req);
      if (!!email && !errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      let filePath;
      if (req.file && req.file.path) {
        filePath = req.file.path;
      }
      const userData = await UserService.updateUser(
        id,
        email,
        name,
        dateOfBirth,
        bio,
        location,
        filePath,
      );
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async reset(req, res, next) {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { email } = req.body;
      const response = await UserService.reset(email);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async checkToken(req, res, next) {
    try {
      const hash = req.params.hash;
      const hashData = await UserService.checkToken(hash);
      return res.redirect(
        `${process.env.CLIENT_URL}/auth?hash=${hashData.hash}&value=recovery`,
      );
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }
      const { hash, password } = req.body;
      const userData = await UserService.changePassword(hash, password);
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
