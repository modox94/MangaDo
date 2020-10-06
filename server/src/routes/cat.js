const express = require('express');
// const { catsArray } = require('../../app');
const randomInteger = require('../helpers/randomizer');

const router = express.Router();

let catsArray = [
  'https://cdn2.thecatapi.com/images/MTY1MTg4MA.jpg',
  'https://cdn2.thecatapi.com/images/MTgzMDI0NA.jpg',
  'https://cdn2.thecatapi.com/images/b7e.jpg',
  'https://cdn2.thecatapi.com/images/bnn.jpg',
  'https://cdn2.thecatapi.com/images/cua.jpg',
  'https://cdn2.thecatapi.com/images/a5f.jpg',
  'https://cdn2.thecatapi.com/images/7B3W2JCEl.jpg',
  'https://cdn2.thecatapi.com/images/3nk.jpg',
  'https://cdn2.thecatapi.com/images/a10.jpg',
  'https://cdn2.thecatapi.com/images/72p.jpg',
];

router.get('', (req, res) => {
  console.log('catsArray', catsArray);
  res.json(catsArray[randomInteger(0, 9)]);
});

module.exports = router;
