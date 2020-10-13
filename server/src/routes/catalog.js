const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');

const router = express.Router();

router.get('/', getCatalog);
router.get('/:path', getCatalog);

async function getCatalog(req, res) {
  let start, end;
  start = new Date();
  console.log('calalog/ - start');

  let additionalPath = req.params.path ? req.params.path.split('|') : [''];

  let inputPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);
  let outputPath = path.join(
    path.resolve('./'),
    'public',
    'preview',
    ...additionalPath
  );

  let dir = fs.readdirSync(inputPath);

  let files = {};
  let folders = [];

  for (let element of dir) {
    let elementParse = path.parse(element);

    if (elementParse.ext === '.psd') {
      files[elementParse.name] = {
        preview:
          path.join('static', 'preview', ...additionalPath, elementParse.name) +
          '.jpg' +
          `?time=${Date.now()}`,
        url: '/psd/' + req.params.path + '|' + element,
      };
    } else if (elementParse.ext === '' && element !== '.DS_Store') {
      folders.push(element);
    }
  }

  if (Object.keys(files).length) {
    fs.mkdirSync(outputPath, { recursive: true });

    await Promise.all(
      Object.keys(files).map((file) => {
        let inputStat, outputStat;
        try {
          inputStat = fs.statSync(path.join(inputPath, file) + '.psd').mtimeMs;
          outputStat = fs.statSync(path.join(outputPath, file) + '.jpg')
            .mtimeMs;
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log('file or directory does not exist');
          }
        }

        if (inputStat && outputStat) {
          if (inputStat < outputStat) {
            return;
          } else {
            fs.unlinkSync(path.join(outputPath, file) + '.jpg');
          }
        }

        return new Promise((resolve, reject) => {
          let args = [
            path.join(inputPath, file) + '.psd[0]',
            '-background',
            'white',
            '-flatten',
            '-resize',
            'x400',
            '-quality',
            '90',
            path.join(outputPath, file) + '.jpg',
          ];

          imagemagick.convert(args, function (err, stdout, stderr) {
            console.log('write ', new Date() - start, 'ms');
            if (err) console.log(err);
            resolve();
          });
        });
      })
    );
  }
  end = new Date();
  console.log('calalog/ - end', end - start, 'ms');

  res.json({ folders, files });
}

module.exports = router;
