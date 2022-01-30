/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const express = require('express');
const imagemagick = require('imagemagick');
const { DOT } = require('../constants');

const router = express.Router();

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

  let dir = {};
  try {
    dir = fs.readdirSync(path.join(...inputPath));
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
      res.status(404).json({ error: 'ENOENT: no such file or directory' });
      return;
    }
  }
  const files = {};
  const folders = [];

  for (const element of dir) {
    const elementParse = path.parse(element);

    if (elementParse.ext === DOT.PSD) {
      files[elementParse.name] = {
        preview: path.join(
          'static',
          'preview',
          ...additionalPath,
          `${elementParse.name}${DOT.JPG}?time=${Date.now()}`
        ),
        url: `/psd/${
          additionalPath.length ? `${additionalPath.join('|')}|` : ''
        }${element}`,
      };
    } else if (elementParse.ext === '' && element !== '.DS_Store') {
      folders.push(element);
    }
  }

  if (Object.keys(files).length) {
    fs.mkdirSync(path.join(...outputPath), { recursive: true });

    await Promise.all(
      Object.keys(files).map((file) => {
        let inputStat;
        let outputStat;
        try {
          inputStat = fs.statSync(
            path.join(...inputPath, `${file}${DOT.PSD}`)
          ).mtimeMs;
          outputStat = fs.statSync(
            path.join(...outputPath, `${file}${DOT.JPG}`)
          ).mtimeMs;
        } catch (error) {
          if (error.code === 'ENOENT') {
            console.log('file or directory does not exist');
          }
        }

        if (inputStat && outputStat) {
          if (inputStat < outputStat) {
            return null;
          }
          fs.unlinkSync(path.join(...outputPath, `${file}${DOT.JPG}`));
        }

        return new Promise((resolve) => {
          const args = [
            path.join(...inputPath, `${file}${DOT.PSD}[0]`),
            '-background',
            'white',
            '-flatten',
            '-resize',
            'x400',
            '-quality',
            '90',
            path.join(...outputPath, `${file}${DOT.JPG}`),
          ];

          imagemagick.convert(args, (err) => {
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

router.get('/', getCatalog);
router.get('/:path', getCatalog);

module.exports = router;
