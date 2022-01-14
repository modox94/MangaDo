const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');

const router = express.Router();

router.get('/', getCatalog);
router.get('/:path', getCatalog);

async function getCatalog(req, res) {
  const start = new Date();
  console.log('calalog/ - start');

  const additionalPath = req.params.path?.split('|') || [];
  const inputPath = [process.env.YANDEX_ROOT, ...additionalPath];
  const outputPath = [
    path.resolve('./'),
    'public',
    'preview',
    ...additionalPath,
  ];

  const dir = fs.readdirSync(path.join(...inputPath));
  const files = {};
  const folders = [];

  for (const element of dir) {
    const elementParse = path.parse(element);

    if (elementParse.ext === '.psd') {
      files[elementParse.name] = {
        preview: path.join(
          'static',
          'preview',
          ...additionalPath,
          elementParse.name + '.jpg' + `?time=${Date.now()}`
        ),
        url:
          '/psd/' +
          (additionalPath.length ? additionalPath.join('|') + '|' : '') +
          element,
      };
    } else if (elementParse.ext === '' && element !== '.DS_Store') {
      folders.push(element);
    }
  }

  if (Object.keys(files).length) {
    fs.mkdirSync(path.join(...outputPath), { recursive: true });

    await Promise.all(
      Object.keys(files).map((file) => {
        let inputStat, outputStat;
        try {
          inputStat = fs.statSync(
            path.join(...inputPath, file + '.psd')
          ).mtimeMs;
          outputStat = fs.statSync(
            path.join(...outputPath, file + '.jpg')
          ).mtimeMs;
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log('file or directory does not exist');
          }
        }

        if (inputStat && outputStat) {
          if (inputStat < outputStat) {
            return;
          } else {
            fs.unlinkSync(path.join(...outputPath, file + '.jpg'));
          }
        }

        return new Promise((resolve, reject) => {
          const args = [
            path.join(...inputPath, file + '.psd[0]'),
            '-background',
            'white',
            '-flatten',
            '-resize',
            'x400',
            '-quality',
            '90',
            path.join(...outputPath, file + '.jpg'),
          ];

          imagemagick.convert(args, function (err, stdout, stderr) {
            console.log('write ', new Date() - start, 'ms');
            if (err) {
              console.log(err);
            }
            resolve();
          });
        });
      })
    );
  }
  const end = new Date();
  console.log('calalog/ - end', end - start, 'ms');

  res.json({ folders, files });
}

module.exports = router;
