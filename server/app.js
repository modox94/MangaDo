require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const catRouter = require('./src/routes/cat');

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/cat', catRouter);

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
