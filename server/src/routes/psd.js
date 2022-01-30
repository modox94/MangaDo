/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');
const imagemagick = require('imagemagick');
const { DOT } = require('../constants');
const Psd = require('../models/psd.modele');

const router = express.Router();

async function getPsdObj(url) {
  let psdObj = await Psd.findOne({ url }).populate('marks');
  if (!psdObj) {
    psdObj = new Psd({ url });
  }
  psdObj.save();

  return psdObj;
}

async function getCompletePsd(req, res) {
  const start = new Date();
  console.log('start - /psd/:path', start);

  const psdObj = await getPsdObj(req.params.path);

  const additionalPath = req.params.path.split('|') || [];
  const inputPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);

  const file = path.parse(inputPath);
  const outputPath = path.join(
    path.resolve('./'),
    'public',
    'complete',
    ...additionalPath
  );

  let inputStat;
  let oldComplete;
  let outputStat;
  const regular = new RegExp(`^${file.name}-(\\d+)${DOT.PNG}`);

  try {
    inputStat = fs.statSync(inputPath).mtimeMs;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
      res.status(404).json({ error: 'ENOENT: no such file or directory' });
      return;
    }
  }

  try {
    oldComplete = fs.readdirSync(outputPath);
    outputStat = fs.statSync(path.join(outputPath, oldComplete[0])).mtimeMs;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  if (inputStat && outputStat && inputStat < outputStat) {
    oldComplete.sort((a, b) => {
      if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
        return 1;
      }
      return -1;
    });

    oldComplete = oldComplete.map((element) => [
      path.join(
        'static',
        'complete',
        ...additionalPath,
        `${element}?time=${Date.now()}`
      ),
      true,
    ]);

    const end = new Date();
    console.log('end - /psd/:path', end - start, 'ms');

    res.json({ complete: oldComplete, psdObj });
    return;
  }

  try {
    fs.rmSync(outputPath, { recursive: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve) => {
    const args = [
      `${inputPath}[0]`,
      '-background',
      'white',
      '-flatten',
      '-resize',
      '900x',
      path.join(outputPath, `${file.name}${DOT.PNG}`),
    ];

    imagemagick.convert(args, (error) => {
      console.log('write ', new Date());
      if (error) {
        console.log(error);
      }
      resolve();
    });
  });

  let complete = fs.readdirSync(outputPath);

  complete.sort((a, b) => {
    if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
      return 1;
    }
    return -1;
  });

  complete = complete.map((element) => [
    path.join(
      'static',
      'complete',
      ...additionalPath,
      `${element}?time=${Date.now()}`
    ),
    true,
  ]);

  const end = new Date();
  console.log('end - /psd/:path', end - start, 'ms');

  res.json({ complete, psdObj });
}

async function getLayersPsd(req, res) {
  const start = new Date();
  console.log('start - /psd/:path/layers', start);

  const psdObj = await getPsdObj(req.params.path);

  const additionalPath = req.params.path.split('|') || [];
  const inputPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);

  const file = path.parse(inputPath);
  const outputPath = path.join(
    path.resolve('./'),
    'public',
    'layers',
    ...additionalPath
  );

  let oldLayers;
  let inputStat;
  let outputStat;
  const regular = new RegExp(`^${file.name}-(\\d+)${DOT.PNG}`);

  try {
    oldLayers = fs.readdirSync(outputPath);
    inputStat = fs.statSync(inputPath).mtimeMs;
    outputStat = fs.statSync(path.join(outputPath, oldLayers[0])).mtimeMs;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  if (inputStat && outputStat && inputStat < outputStat) {
    oldLayers.sort((a, b) => {
      if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
        return 1;
      }
      return -1;
    });

    oldLayers = oldLayers.map((element) => [
      path.join(
        'static',
        'layers',
        ...additionalPath,
        `${element}?time=${Date.now()}`
      ),
      true,
    ]);

    const end = new Date();
    console.log('end - /psd/:path/layers', end - start, 'ms');

    res.json({ layers: oldLayers, psdObj });
    return;
  }

  try {
    fs.rmSync(outputPath, { recursive: true });
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve) => {
    const args = [
      inputPath,
      '-set',
      'dispose',
      'Background',
      '-coalesce',
      '-resize',
      '900x',
      path.join(outputPath, `${file.name}${DOT.PNG}`),
    ];

    imagemagick.convert(args, (error) => {
      console.log('write ', new Date());
      if (error) {
        console.log(error);
      }
      resolve();
    });
  });

  let layers = fs.readdirSync(outputPath);

  layers.sort((a, b) => {
    if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
      return 1;
    }
    return -1;
  });

  layers = layers.map((element) => [
    path.join(
      'static',
      'layers',
      ...additionalPath,
      `${element}?time=${Date.now()}`
    ),
    true,
  ]);

  const end = new Date();
  console.log('end - /psd/:path/layers', end - start, 'ms');

  res.json({ layers, psdObj });
}

router.get('/:path', getCompletePsd);
router.get('/:path/layers', getLayersPsd);

module.exports = router;
