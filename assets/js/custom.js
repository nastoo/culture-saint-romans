const audio = document.getElementById('audio');
const playPauseBtn = document.querySelector('.play-pause');
const progressBar = document.querySelector('.progress-bar');
const timeDisplay = document.querySelector('.time');
const volumeControl = document.querySelector('.volume-control');

// Toggle play/pause
playPauseBtn.addEventListener('click', () => {
  try {
    if (audio.paused) {
      audio.play()
        .then(() => {
          playPauseBtn.textContent = '⏸';
          playPauseBtn.setAttribute('aria-label', 'Pause');
        })
        .catch(error => {
          console.error('Playback failed:', error);
          playPauseBtn.textContent = '⏵';
        });
    } else {
      audio.pause();
      playPauseBtn.textContent = '⏵';
      playPauseBtn.setAttribute('aria-label', 'Play');
    }
  } catch (error) {
    console.error('Error toggling playback:', error);
  }
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progress}%`;
  timeDisplay.textContent = formatTime(audio.currentTime);
});

// Seek on progress bar click
document.querySelector('.progress-container').addEventListener('click', (e) => {
  const progressContainer = e.currentTarget;
  const clickPosition = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickPosition / progressContainer.clientWidth) * duration;
});

// Format time (mm:ss)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Volume control
if (volumeControl) {
  volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
  });
}
