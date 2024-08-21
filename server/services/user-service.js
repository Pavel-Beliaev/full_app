const UserModel = require('../models/user-model');
const FollowModel = require('../models/follows-model');
const MailService = require('./mail-service');
const TokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jdenticon = require('jdenticon');
const path = require('path');
const fs = require('fs');
const UserDto = require('../dtos/user-dto');
const FollowDto = require('../dtos/follows-dto');
const crypto = require('crypto');

const PORT = process.env.PORT || '5000';

class UserService {
  async register(name, email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw ApiError.BadRequest('Email already exists');
    }
    const hashPass = await bcrypt.hash(password, 10);
    const activationLink = uuid.v4();
    const png = jdenticon.toPng(`${name}${Date.now()}`, 200);
    const avatarName = `${name}_${Date.now()}.png`;
    const avatarPath = path.join(__dirname, '/../uploads', avatarName);
    fs.writeFileSync(avatarPath, png);
    const user = await UserModel.create({
      email,
      password: hashPass,
      name,
      avatarUrl: `/uploads/${avatarName}`,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}${PORT}/api/activate/${activationLink}`,
    );
    return { status: 'success' };
  }

  async activate(activationLink) {
    const user = await UserModel.findOneAndUpdate(
      { activationLink },
      {
        isActivated: true,
      },
    );
    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }
    user.activationLink = undefined;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Wrong login or password');
    }
    if (!user.isActivated) {
      throw ApiError.BadRequest('Email not activated');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong login or password');
    }
    const userDto = new UserDto(user).login();
    const token = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return token;
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
    const userDto = new UserDto(user).login();
    const token = TokenService.generateToken({ ...userDto });
    await TokenService.saveToken(userDto.id, token.refreshToken);
    return token;
  }

  async current(userId) {
    const user = await UserModel.findById(userId)
      .populate({
        path: 'followers',
        populate: 'follower',
      })
      .populate({
        path: 'following',
        populate: 'following',
      });
    if (!user) {
      throw ApiError.NotFoundError('CardUser not found');
    }
    return {
      ...new UserDto(user).current(),
      followers: user.followers.map((follower) => ({
        ...new FollowDto(follower),
        follower: {
          ...new UserDto(follower.follower).follow()
        }
      })),
      following: user.following.map((follow) => ({
        ...new FollowDto(follow),
        following: {
          ...new UserDto(follow.following).follow()
        }
      })),
    };
  }

  async getUserById(paramId, userId) {
    const user = await UserModel.findById(paramId);
    if (!user) {
      throw ApiError.NotFoundError('CardUser not found');
    }
    const userDto = new UserDto(user);
    const isFollowing = await FollowModel.findOne({
      follower: userId,
      following: paramId,
    });
    return { ...userDto, isFollowing: Boolean(isFollowing) };
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
        avatarUrl: filePath ? `/${filePath}` : undefined,
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
