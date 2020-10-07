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

  let currentPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);

  let dir = fs.readdirSync(currentPath);

  dir = dir.filter((element) => {
    if (element === '.DS_Store') return false;
    let pathParse = path.parse(element);

    if (pathParse.ext === '.psd') {
      return true;
    } else if (pathParse.ext === '') {
      return true;
    }

    return false;
  });

  console.log('after filter: ', dir, new Date());

  fs.mkdirSync(`${path.resolve('./')}/public/preview/${req.params.path}`, {
    recursive: true,
  });

  let psd = {};
  let folders = [];

  await Promise.all(
    dir.map((element) => {
      let pathParse = path.parse(element);

      if (pathParse.ext === '.psd') {
        psd[pathParse.name] = {
          preview: `/static/preview/${req.params.path}/${pathParse.name}.jpg`,
          url: `/psd/${req.params.path}|${element}`,
        };

        return new Promise((resolve, reject) => {
          imagemagick.resize(
            {
              srcData: fs.readFileSync(
                `${currentPath + '/' + element}`,
                'binary'
              ),
              quality: 0.8,
              format: 'jpg',
              height: 400,
            },
            function (err, stdout, stderr) {
              console.log('write ', element, new Date());

              if (err) console.log(err);

              fs.writeFileSync(
                `${path.resolve('./')}/public/preview/${req.params.path}/${
                  pathParse.name
                }.jpg`,
                stdout,
                'binary'
              );

              resolve();
            }
          );
        });
      } else {
        folders.push(element);
      }
    })
  );

  console.log('router /:path GET', dir);

  res.json({ folders, psd });
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
