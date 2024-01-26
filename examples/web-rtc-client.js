const WebSocket = require('ws');

const peerId = "testPeer3"
const port = 3030
const signalingServerUrl = `http://localhost:${port}`
const token = "SIGNALING123";

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const websocket = new WebSocket(wsServerUrl)
const peerConnection = new RTCPeerConnection(configuration);

function handleSignalingData(data) {
  if (data.offer) {
    // Handle the offer
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
      .then(() => peerConnection.createAnswer())
      .then((answer) => peerConnection.setLocalDescription(answer))
      .then(() => {
        // Send the answer to the signaling server
        ws.send(JSON.stringify({ answer: peerConnection.localDescription }));
      });
  } else if (data.answer) {
    // Handle the answer
    peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
  } else if (data.iceCandidate) {
    // Handle ICE candidate
    peerConnection.addIceCandidate(new RTCIceCandidate(data.iceCandidate));
  }
}

websocket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  handleSignalingData(data);
})

peerConnection.createOffer()
  .then((offer) => peerConnection.setLocalDescription(offer))
  .then(() => {
    // Send the offer to the signaling server
    ws.send(JSON.stringify({ offer: peerConnection.localDescription }));
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Send ICE candidate to the other peer
      ws.send(JSON.stringify({ iceCandidate: event.candidate }));
    }
  };