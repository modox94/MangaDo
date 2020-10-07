const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');

const router = express.Router();

router.get('/', (req, res) => {
  let dir = fs.readdirSync(process.env.YANDEX_ROOT);

  dir = dir.filter((element) => {
    //  if (element !== '.DS_Store') return false
    let chunks = element.split('.');
    if (chunks.length === 1) return true;
  });

  console.log('router / GET', dir);

  res.json({ folders: dir });
});

// // мы в /
// {
//   folders: ['Kuneru Maruta', 'Yama to Shokuyoku to Watashi'],
// }

router.get('/:path', async (req, res) => {
  console.log('calalog/ - start', new Date());

  let additionalPath = req.params.path.split('|');

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
          '.jpg',
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
            console.log('write ', new Date());
            if (err) console.log(err);
            resolve();
          });
        });
      })
    );
  }

  console.log('calalog/ - end', new Date());

  res.json({ folders, files });
});

// // мы в /Kuneru Maruta/
// {
//   folders: ['test'],
//   psd: {
//     113: {
//       preview: 'static/preview/Kuneru Maruta/113.jpg',
//       url: '/psd/Kuneru Maruta/113.psd',
//     },
//     114: {
//       preview: 'static/preview/Kuneru Maruta/114.jpg',
//       url: '/psd/Kuneru Maruta/114.psd',
//     },
//   },
// }

module.exports = router;
