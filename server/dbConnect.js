const mongoose = require('mongoose');
require('dotenv').config();

// const dbPath = 'mongodb://localhost:27017/';
const { DB_NAME, DB_LOGIN, DB_PASS } = process.env;
const dbPath = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@cluster0.f3yi0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const dbConnect = () => {
  mongoose.connect(
    `${dbPath}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) throw err;
      console.log(`Connection success.`);
    }
  );
};

module.exports = dbConnect;
