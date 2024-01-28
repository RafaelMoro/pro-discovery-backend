const express = require("express");
const ws = require('ws');

const app = express();
const PORT = process.env.PORT ?? 3000

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  // console.log('socket', socket)
  socket.on('message', (message, isBinary) => {
    const newMessage = isBinary ? message : message.toString()

    wsServer.clients.forEach((client) => {
      if (client !== socket && client.readyState === ws.OPEN) {
        client.send(newMessage)
      }
    })
  });
});

const server = app.listen(PORT, console.log(`Listening on PORT: ${PORT}`));
server. on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});