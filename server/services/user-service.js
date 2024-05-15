const UserModel = require('../models/user-model');
const FollowModel = require('../models/follows-model');
const MailService = require('./mail-service');
const TokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jdenticon = require('jdenticon');
const path = require('path');
const fs = require('fs');
const UserDto = require('../dtos/user-dto');
const crypto = require('crypto');

const PORT = process.env.PORT || '5000';

class UserService {
  async register(name, email, password) {
    // проверяем есть ли пользователь в базе
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      // показываем ошибку если есть
      throw ApiError.BadRequest('Email already exists');
    }
    //иначе, хэшируем пароль
    const hashPass = await bcrypt.hash(password, 10);
    // создаем ссылку для активации
    const activationLink = uuid.v4();
    // генерируем default аватар
    const png = jdenticon.toPng(`${name}${Date.now()}`, 200);
    // генерируем имя файла
    const avatarName = `${name}_${Date.now()}.png`;
    // генерируем путь до файла
    const avatarPath = path.join(__dirname, '/../uploads', avatarName);
    // записываем в файл аватар
    fs.writeFileSync(avatarPath, png);
    // создаем пользователя
    const user = await UserModel.create({
      email,
      password: hashPass,
      name,
      avatarUrl: `/uploads/${avatarName}`,
      activationLink,
    });
    // отправляем письмо для активации аккаунта на почту
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}${PORT}/api/activate/${activationLink}`,
    );
    // создаем новую model
    const userDto = new UserDto(user).enterData();
    return {
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await UserModel.findOneAndUpdate(
      { activationLink },
      {
        isActivated: true,
      },
    ).exec();
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Wrong login or password');
    }
    //  проверка активации email
    if (!user.isActivated) {
      throw ApiError.BadRequest('Email not activated');
    }
    // сверка пароля
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong login or password');
    }
    const userDto = new UserDto(user).enterData();
    // генерируем токен
    const token = TokenService.generateToken({ ...userDto });
    // сохраняем токен
    await TokenService.saveToken(userDto.id, token.refreshToken);
    // возвращаем новый объект с токенами и данными пользователя
    return {
      ...token,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    await TokenService.removeToken(refreshToken);
    return { status: 'success' };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return { ...token, user: userDto };
  }

  async current(id) {
    const user = await UserModel.findById(id);
    if (!user) {
      throw ApiError.NotFoundError('User not found');
    }
    const userDto = new UserDto(user);
    const token = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return { ...token, user: userDto };
  }

  async getUserById(paramId, userId) {
    const user = await UserModel.findById(paramId);
    if (!user) {
      throw ApiError.NotFoundError('User not found');
    }
    const userDto = new UserDto(user);
    const isFollowing = await FollowModel.findOne({
      follower: userId,
      following: paramId,
    });
    return { user: { ...userDto, isFollowing: Boolean(isFollowing) } };
  }

  async updateUser(id, email, name, dateOfBirth, bio, location, filePath) {
    if (!!email) {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser && existingUser.id !== id) {
        throw ApiError.BadRequest('This email address is already used by...');
      }
    }
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        email: email || undefined,
        name: name || undefined,
        dateOfBirth: dateOfBirth || undefined,
        bio: bio || undefined,
        location: location || undefined,
        filePath: filePath ? `/${filePath}` : undefined,
      },
      { new: true },
    );
    const userDto = new UserDto(user).userData();
    return { user: userDto };
  }

  async reset(email) {
    const hash = crypto.randomBytes(24).toString('hex');
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        hash,
        hashExp: Date.now() + 60 * 60 * 1000,
      },
      { new: true },
    );
    if (!user) {
      // сделать одинаковый ответ при поиске пользователя в базе
      throw ApiError.NotFoundError('Email not found');
    }
    await MailService.resetPassword(
      user.name,
      email,
      `${process.env.API_URL}${PORT}/api/change_password/${hash}`,
    );
    return { message: 'Check your email' };
  }

  async checkToken(hash) {
    const user = await UserModel.findOne({
      hash,
      hashExp: { $gt: Date.now() },
    });
    if (!user) {
      throw ApiError.BadRequest('The link is outdated');
    }
    return { hash };
  }

  async changePassword(hash, password) {
    const user = await UserModel.findOne({
      hash,
      hashExp: { $gt: Date.now() },
    });
    if (!user) {
      throw ApiError.BadRequest('Token has expired');
    }
    user.password = await bcrypt.hash(password, 10);
    user.hash = undefined;
    user.hashExp = undefined;
    await user.save();
    return { message: 'Password changed' };
  }
}

module.exports = new UserService();
