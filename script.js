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

let songIndex = 0; // start with the first song

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

loadSong(songs[songIndex]);

let isPlaying = false;

function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸"; // change icon
  cover.style.animation = "spin 5s linear infinite"; // rotate cover
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶";
  cover.style.animation = "none";
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

function prevSong() {
  songIndex--; // go back one index
  if (songIndex < 0) {
    songIndex = songs.length - 1; // if at first song, go to last
  }
  loadSong(songs[songIndex]); // update the UI
  playSong(); // automatically play
}

function nextSong() {
  songIndex++; // go forward one index
  if (songIndex >= songs.length) {
    songIndex = 0; // if at last song, go back to first
  }
  loadSong(songs[songIndex]); // update the UI
  playSong(); // automatically play
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  // Update time display
  let minutes = Math.floor(currentTime / 60);
  let seconds = Math.floor(currentTime % 60);
  if (seconds < 10) seconds = `0${seconds}`;
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  // Total duration
  let totalMinutes = Math.floor(duration / 60);
  let totalSeconds = Math.floor(duration % 60);
  if (totalSeconds < 10) totalSeconds = `0${totalSeconds}`;
  if (!isNaN(duration)) {
    durationEl.textContent = `${totalMinutes}:${totalSeconds}`;
  }
}

audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

progressContainer.addEventListener('click', setProgress);

volumeSlider.addEventListener('input', (e) => {
  audio.volume = e.target.value;
});

audio.volume = volumeSlider.value; // sets volume to 0.9 by default

audio.addEventListener('ended', () => {
  nextSong(); // automatically go to the next song
});

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) songIndex = 0; // loops back to first song
  loadSong(songs[songIndex]);
  updateActiveSong();
  playSong();
}
