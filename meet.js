// Get references to the video elements and buttons
const localVideo = document.getElementById('localVideo');
const remoteVideos = document.getElementById('remote-videos');
const toggleMuteBtn = document.getElementById('toggleMute');
const toggleVideoBtn = document.getElementById('toggleVideo');
const endCallBtn = document.getElementById('endCall');

// Set up WebRTC variables
let localStream;
let peerConnection;
const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }; // STUN server for ICE connection

// Constraints for media devices (video and audio)
const constraints = {
  video: true,
  audio: true
};

// Start the video call by accessing media devices
navigator.mediaDevices.getUserMedia(constraints)
  .then(stream => {
    localStream = stream;
    localVideo.srcObject = localStream;

    // Set up the peer connection
    peerConnection = new RTCPeerConnection(config);
    localStream.getTracks().forEach(track => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        // Send the candidate to the remote peer (simulated for now)
      }
    };

    peerConnection.ontrack = event => {
      // Create a new video element for the remote stream
      const remoteVideo = document.createElement('video');
      remoteVideo.srcObject = event.streams[0];
      remoteVideo.autoplay = true;
      remoteVideos.appendChild(remoteVideo);
    };

    // Create an offer to connect to the remote peer (for simplicity, not signaling)
    peerConnection.createOffer()
      .then(offer => {
        return peerConnection.setLocalDescription(offer);
      })
      .catch(err => console.error('Error creating offer:', err));
  })
  .catch(err => console.error('Error accessing media devices:', err));

// Toggle mute/unmute functionality
function toggleMute() {
  const audioTrack = localStream.getAudioTracks()[0];
  if (audioTrack.enabled) {
    audioTrack.enabled = false;
    toggleMuteBtn.textContent = 'Unmute';
  } else {
    audioTrack.enabled = true;
    toggleMuteBtn.textContent = 'Mute';
  }
}

// Toggle video on/off functionality
function toggleVideo() {
  const videoTrack = localStream.getVideoTracks()[0];
  if (videoTrack.enabled) {
    videoTrack.enabled = false;
    toggleVideoBtn.textContent = 'Turn On Video';
  } else {
    videoTrack.enabled = true;
    toggleVideoBtn.textContent = 'Turn Off Video';
  }
}

// End the call
function endCall() {
  const tracks = localStream.getTracks();
  tracks.forEach(track => track.stop());
  peerConnection.close();
  remoteVideos.innerHTML = ''; // Clear remote video containers
}
