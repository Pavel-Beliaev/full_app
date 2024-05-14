const app = require('./index');
const mongoose = require('mongoose');

const PORT = process.env.PORT || '5000';

const serverStart = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.error('Connection error:', error);
  }
};

serverStart();
