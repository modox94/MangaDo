require('dotenv').config();
const express = require('express');
const ws = require('ws');
const cors = require('cors');
const dbConnect = require('./dbConnect.js');
const catalogRouter = require('./src/routes/catalog');
const psdRouter = require('./src/routes/psd');

const PORT = process.env.PORT ?? 3000;

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.use('/catalog', catalogRouter);
app.use('/psd', psdRouter);

const expressServer = app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});

const wsServer = new ws.Server({
  server: expressServer,
});

wsServer.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wsServer.clients.forEach(function each(client) {
      console.log(data);
      client.send(data);
    });
  });
});
