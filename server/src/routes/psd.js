const express = require('express');
const fs = require('fs');
const path = require('path');
const imagemagick = require('imagemagick');

const router = express.Router();

router.get('/:path', async (req, res) => {
  console.log('start', new Date());

  let additionalPath = req.params.path.split('|');

  let inputPath = path.join(process.env.YANDEX_ROOT, ...additionalPath);
  console.log('additionalPath', additionalPath);
  console.log('inputPath', inputPath);

  let file = path.parse(inputPath);
  let outputPath = path.join(
    path.resolve('./'),
    'public',
    'layers',
    ...additionalPath
  );
  fs.mkdirSync(outputPath, { recursive: true });

  await new Promise((resolve, reject) => {
    let args = [
      inputPath,
      '-set',
      'dispose',
      'Background',
      '-coalesce',
      outputPath + file.name + '.jpg',
    ];

    imagemagick.convert(args, function (err, stdout, stderr) {
      console.log('write ', new Date());

      if (err) console.log(err);

      fs.writeFileSync(outputPath + file.name + '.jpg', stdout, 'binary');
      resolve();
    });
  });

  // await Promise.all(
  //   dir.map((element) => {
  //     let pathParse = path.parse(element);

  //     if (pathParse.ext === '.psd') {
  //       psd[
  //         pathParse.name
  //       ] = `/static/preview/${req.params.path}/${pathParse.name}.jpg`;

  //       return new Promise((resolve, reject) => {
  //         imagemagick.resize(
  //           {
  //             srcData: fs.readFileSync(
  //               `${inputPath + '/' + element}`,
  //               'binary'
  //             ),
  //             quality: 0.8,
  //             format: 'jpg',
  //             height: 400,
  //           },
  //           function (err, stdout, stderr) {
  //             console.log('write ', element, new Date());

  //             if (err) console.log(err);

  //             fs.writeFileSync(
  //               `${path.resolve('./')}/public/preview/${req.params.path}/${
  //                 pathParse.name
  //               }.jpg`,
  //               stdout,
  //               'binary'
  //             );

  //             resolve();
  //           }
  //         );
  //       });
  //     } else {
  //       folders.push(element);
  //     }
  //   })
  // );

  // console.log('router /:path GET', dir);

  // res.json({ folders, psd });

  res.end();
});

module.exports = router;
