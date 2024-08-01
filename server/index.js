require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const router = require('./routes');
const errorMiddleware = require('./middlewares/error-middleware');
const fs = require('fs');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
}
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'jade');
app.use('/uploads', express.static('uploads'));
app.use('/api', router);
app.use(errorMiddleware);

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

module.exports = app;
