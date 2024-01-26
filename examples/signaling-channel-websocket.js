class SignalingChannelWebsocket {
  constuctor(peerId, signalingServerUrl) {
    this.peerId = peerId
    this.socket = new WebSocket(signalingServerUrl)
  }

  connect() {
    // this.socket.
  }
}