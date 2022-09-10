require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const WebSocket = require('ws');
const dbConnect = require('./dbConnect');
const websocketRequest = require('./src/helpers/websocketRequest');
const catalogRouter = require('./src/routes/catalog');
const psdRouter = require('./src/routes/psd');
const userRouter = require('./src/routes/userRouter');

const PORT = process.env.PORT ?? 3000;

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const buildPath = '../client/build';
app.use(express.static(path.join(__dirname, buildPath)));
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, buildPath, 'index.html'))
);

app.use('/catalog', catalogRouter);
app.use('/psd', psdRouter);
app.use('/user', userRouter);

const expressServer = app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});

const WebSocketServer = new WebSocket.Server({
  server: expressServer,
});

WebSocketServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    websocketRequest(JSON.parse(data));

    WebSocketServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
