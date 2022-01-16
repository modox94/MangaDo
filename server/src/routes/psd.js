const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');
const Psd = require('../models/psd.modele');

const router = express.Router();

router.get('/:path', getCompletePsd);
router.get('/:path/layers', getLayersPsd);

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

  let oldComplete, inputStat, outputStat;
  const regular = new RegExp(`^${file.name}-(\\d+)\\.png`);

  try {
    oldComplete = fs.readdirSync(outputPath);
    inputStat = fs.statSync(inputPath).mtimeMs;
    outputStat = fs.statSync(path.join(outputPath, oldComplete[0])).mtimeMs;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  if (inputStat && outputStat && inputStat < outputStat) {
    oldComplete.sort((a, b) => {
      if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
        return 1;
      } else {
        return -1;
      }
    });

    oldComplete = oldComplete.map((element) => [
      path.join(
        'static',
        'complete',
        ...additionalPath,
        element + `?time=${Date.now()}`
      ),
      true,
    ]);

    const end = new Date();
    console.log('end - /psd/:path', end - start, 'ms');

    return res.json({ complete: oldComplete, psdObj });
  }

  try {
    fs.rmSync(outputPath, { recursive: true });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve) => {
    let args = [
      inputPath + '[0]',
      '-background',
      'white',
      '-flatten',
      '-resize',
      '900x',
      path.join(outputPath, file.name + '.png'),
    ];

    imagemagick.convert(args, function (err) {
      console.log('write ', new Date());
      if (err) console.log(err);
      resolve();
    });
  });

  let complete = fs.readdirSync(outputPath);

  complete.sort((a, b) => {
    if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
      return 1;
    } else {
      return -1;
    }
  });

  complete = complete.map((element) => [
    path.join(
      'static',
      'complete',
      ...additionalPath,
      element + `?time=${Date.now()}`
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

  let oldLayers, inputStat, outputStat;
  const regular = new RegExp(`^${file.name}-(\\d+)\\.png`);

  try {
    oldLayers = fs.readdirSync(outputPath);
    inputStat = fs.statSync(inputPath).mtimeMs;
    outputStat = fs.statSync(path.join(outputPath, oldLayers[0])).mtimeMs;
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  if (inputStat && outputStat && inputStat < outputStat) {
    oldLayers.sort((a, b) => {
      if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
        return 1;
      } else {
        return -1;
      }
    });

    oldLayers = oldLayers.map((element) => [
      path.join(
        'static',
        'layers',
        ...additionalPath,
        element + `?time=${Date.now()}`
      ),
      true,
    ]);

    const end = new Date();
    console.log('end - /psd/:path/layers', end - start, 'ms');

    return res.json({ layers: oldLayers, psdObj });
  }

  try {
    fs.rmSync(outputPath, { recursive: true });
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('file or directory does not exist');
    }
  }

  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve) => {
    let args = [
      inputPath,
      '-set',
      'dispose',
      'Background',
      '-coalesce',
      '-resize',
      '900x',
      path.join(outputPath, file.name + '.png'),
    ];

    imagemagick.convert(args, function (err) {
      console.log('write ', new Date());
      if (err) console.log(err);
      resolve();
    });
  });

  let layers = fs.readdirSync(outputPath);

  layers.sort((a, b) => {
    if (Number(a.replace(regular, '$1')) > Number(b.replace(regular, '$1'))) {
      return 1;
    } else {
      return -1;
    }
  });

  layers = layers.map((element) => [
    path.join(
      'static',
      'layers',
      ...additionalPath,
      element + `?time=${Date.now()}`
    ),
    true,
  ]);

  const end = new Date();
  console.log('end - /psd/:path/layers', end - start, 'ms');

  res.json({ layers, psdObj });
}

module.exports = router;
