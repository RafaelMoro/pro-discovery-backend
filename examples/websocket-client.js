const WebSocket = require('ws');

const peerId = "testPeer4"
const port = 3030
const signalingServerUrl = `http://localhost:${port}`
const wsServerUrl = `ws://localhost:${port}`
const token = "SIGNALING123";

const websocket = new WebSocket(wsServerUrl)
websocket.send(peerId)

websocket.onopen = (event) => {
  console.log('Connection established')
}

websocket.onmessage = (event) => {
  console.log(`Message: Data received from server: ${event.data}`)
}

websocket.onclose = (event) => {
  if (event.wasClean) {
    console.log(`Connection closed cleanly.
    Code ${event.code}
    Reason: ${event.reason}`)
  } else {
    console.log('Connection died')
  }
}
websocket.onerror = (error) => {
  console.log(`Error: ${error.message}`)
}