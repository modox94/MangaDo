const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');

const router = express.Router();

router.get('/:path', async (req, res) => {
  let start = new Date();
  console.log('start - /psd/:path', start);

  let additionalPath = req.params.path.split('|');

  let inputPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);

  let file = path.parse(inputPath);
  let outputPath = path.join(
    path.resolve('./'),
    'public',
    'layers',
    ...additionalPath
  );

  let oldLayers, inputStat, outputStat;
  let regular = new RegExp(`^${file.name}-(\\d+)\\.png`);

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

    oldLayers = oldLayers.map((element) =>
      path.join('static', 'layers', ...additionalPath, element)
    );

    let end = new Date();
    console.log('end - /psd/:path', end - start, 'ms');

    return res.json({ layers: oldLayers });
  }

  fs.rmdirSync(outputPath, { recursive: true });

  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve, reject) => {
    let args = [
      inputPath,
      '-set',
      'dispose',
      'Background',
      '-coalesce',
      '-resize',
      '900x',
      outputPath + '/' + file.name + '.png',
    ];

    imagemagick.convert(args, function (err, stdout, stderr) {
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

  layers = layers.map((element) =>
    path.join('static', 'layers', ...additionalPath, element)
  );

  let end = new Date();
  console.log('end - /psd/:path', end - start, 'ms');

  res.json({ layers });
});

module.exports = router;
