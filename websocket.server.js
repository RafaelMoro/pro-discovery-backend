const express = require("express");
const ws = require('ws');

const app = express();

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  // console.log('socket', socket)
  socket.on('message', (message, isBinary) => {
    const newMessage = isBinary ? message : message.toString()
    // console.log('message', newMessage)
    console.log('isBinary', isBinary)

    wsServer.clients.forEach((client) => {
      if (client !== socket && client.readyState === ws.OPEN) {
        client.send(newMessage)
      }
    })
  });
});

const server = app.listen(3000, console.log(`Listening on PORT 3000`));
server. on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

// const websocketServer = new ws.Server({noServer: true});
// const clients = new Set();