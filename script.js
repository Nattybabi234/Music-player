// Get all the elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeRange');
const playlistEl = document.getElementById('playlist');

// Songs array
const songs = [
  {
    title: "Jugular Jugular",
    artist: "Greatman Takit and Lawrence Oyor",
    src: "music/jugular jugular audio.mp3",
    cover: "images/jugular jugular image.jpeg"
  },
  {
    title: "E ti tobi to o",
    artist: "EmmaOMG",
    src: "music/E ti tobi to o.mp3",
    cover: "images/EmmaOMG E-Ti-Tobi-To image.jpg"
  }
];

let songIndex = 0; // Start with first song
let isPlaying = false;

// Load song
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

// Play / Pause functions
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸";
  cover.style.animation = "spin 5s linear infinite";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
  cover.style.animation = "none";
}

// Toggle play button
playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

// Previous / Next functions
function prevSong() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  updateActiveSong();
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0;
  loadSong(songs[songIndex]);
  updateActiveSong();
  playSong();
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Progress bar update
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Current time
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  if (seconds < 10) seconds = `0${seconds}`;
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  // Duration
  let totalMinutes = Math.floor(duration / 60);
  let totalSeconds = Math.floor(duration % 60);
  if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
  if (!isNaN(duration)) {
    durationEl.textContent = `${totalMinutes}:${totalSeconds}`;
  }
}

audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

// Volume control
volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

audio.volume = volumeSlider.value;

// Auto-play next song
audio.addEventListener('ended', nextSong);

// Playlist creation
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} — ${song.artist}`;
  li.classList.add('playlist-item');

  li.addEventListener('click', () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    updateActiveSong();
    playSong();
  });

  playlistEl.appendChild(li);
});

// Highlight currently playing song
function updateActiveSong() {
  const items = document.querySelectorAll('.playlist-item');
  items.forEach((item, index) => {
    if (index === songIndex) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Initial load
loadSong(songs[songIndex]);
updateActiveSong();
