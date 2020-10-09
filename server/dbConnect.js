const mongoose = require('mongoose');
require('dotenv').config();

const { DB_NAME, DB_LOGIN, DB_PASS } = process.env; // DB_PATH
const dbPath = `mongodb+srv://${DB_LOGIN}:${DB_PASS}@cluster0.f3yi0.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// const dbPath = DB_PATH

const dbConnect = () => {
  mongoose.connect(
    `${dbPath}`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) throw err;
      console.log(`Connection success.`);
    }
  );
};

module.exports = dbConnect;
