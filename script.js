const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// When the video ends, show play button icon:
video.addEventListener('ended', showPlayIcon);


// Progress Bar ---------------------------------- //
// Calculate display time format:
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60); // returns anything above 60
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Update progress bar as video plays:
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Click to adjust video progress:
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth; // offsetX represents pixel value
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
  // the offsetX value is essentially a percentage value, so if 0.2 is 20%, say the video.duration is 20 seconds, 0.2 * 20 = 4. (20% of a 20 second video is 4)
}


// Volume Controls --------------------------- //
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth; // Same as with progress bar
  // Round down or up at start and end of volume slider for ease of use:
  if (volume < 0.1) {
    volume = 0;
  } else if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
}


// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners:
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay); // allows you to click anywhere on the video to play/pause
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
