const Router = require('express').Router;
const router = new Router();
const multer = require('multer');
const { body } = require('express-validator');
const {
  UserController,
  PostController,
  CommentController,
  LikeController,
  FollowController,
} = require('../controllers');
const authMiddleware = require('../middlewares/auth-middleware');

const destination = 'uploads';

const storage = multer.diskStorage({
  destination,
  filename: function (req, file, next) {
    next(null, file.originalname);
  },
});

const uploads = multer({ storage });

//роуты пользователя
router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({
    min: 3,
    max: 24,
  }),
  UserController.register,
);
router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({
    min: 3,
    max: 24,
  }),
  UserController.login,
);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/current', authMiddleware, UserController.currentUser);
router.get('/users/:id', authMiddleware, UserController.getUserById);
router.put(
  '/edit/user/:id',
  authMiddleware,
  body('email').isEmail(),
  UserController.updateUser,
);

//роуты сброса пароля
router.post('/reset', body('email').isEmail(), UserController.reset);
router.get('/change_password/:hash', UserController.checkToken);
router.post(
  '/change_password',
  body('password').isLength({
    min: 3,
    max: 24,
  }),
  UserController.changePassword,
);

//роуты постов
router.post('/posts', authMiddleware, PostController.createPost);
router.get('/posts', authMiddleware, PostController.getAllPosts);
router.get('/posts/:id', authMiddleware, PostController.getPostById);
router.delete('/posts/:id', authMiddleware, PostController.deletePost);

//роуты комментариев
router.post('/comments', authMiddleware, CommentController.createComment);
router.delete('/comments/:id', authMiddleware, CommentController.deleteComment);

//роуты лайков
router.post('/likes', authMiddleware, LikeController.likePost);
router.delete('/likes/:id', authMiddleware, LikeController.unLikePost);

//роуты подписок
router.post('/follow', authMiddleware, FollowController.followUser);
router.delete('/follow/:id', authMiddleware, FollowController.unFollowUser);

module.exports = router;
