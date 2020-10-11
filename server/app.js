require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
const dbConnect = require('./dbConnect.js');
const catalogRouter = require('./src/routes/catalog');
const psdRouter = require('./src/routes/psd');
const userRouter = require('./src/routes/userRouter');
const websocketRequest = require('./src/helpers/websocketRequest');

const PORT = process.env.PORT ?? 3000;

dbConnect();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.use('/catalog', catalogRouter);
app.use('/psd', psdRouter);
app.use('/user', userRouter);

const expressServer = app.listen(PORT, () => {
  console.log('Server has been started on port ', PORT);
});

const WebSocketServer = new WebSocket.Server({
  server: expressServer,
});

WebSocketServer.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    websocketRequest(JSON.parse(data));

    WebSocketServer.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
