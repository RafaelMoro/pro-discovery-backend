class SingalingChannelWebRTC {
  constructor(peerId, signalingServerUrl) {
    this.peerId = peerId;
    this.connections = [];
    this.servers = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
      ],
      icecandidatePoolSize: 10,
    }
    this.localConnection = new RTCPeerConnection(this.servers)
    this.localConnection.peerId = peerId
    this.connections.push(this.localConnection)
  }

  connect() {

  }
}