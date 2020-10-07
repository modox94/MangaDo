require('dotenv').config();
const express = require('express');
const cors = require('cors');

const catalogRouter = require('./src/routes/catalog');
const psdRouter = require('./src/routes/psd');

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.use('/catalog', catalogRouter);
app.use('/psd', psdRouter);

app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});
