let progress = document.getElementById("progress");
let audio = document.getElementById("audio");
let songName = document.getElementById("song-name");
let artistName = document.getElementById("artist-name");
let cover = document.getElementById("song-img");
let playButton = document.getElementById("play-button");
let forwardButton = document.getElementById("forward");
let backwardButton = document.getElementById("backward");
let currentTime = document.querySelector(".current-time");
let duration = document.querySelector(".song-duration");

let songs = [
  {
    name: "Thank you, next",
    path: "assets/music/thankyou.mp3",
    artist: "Ariana Grande",
    cover: "./assets/images/thankyou.jpg",
  },
  {
    name: "Mantra",
    path: "assets/music/mantra.mp3",
    artist: "Jennie",
    cover: "./assets/images/mantra.jpg",
  },
  {
    name: "Rockstar",
    path: "assets/music/rockstar.mp3",
    artist: "Lalalisa",
    cover: "./assets/images/rockstar.png",
  },
];

let currentSong = 0;

function playPause() {
  if (playButton.classList.contains("fa-pause")) {
    audio.pause();
    playButton.classList.remove("fa-pause");
    playButton.classList.add("fa-play");
  } else {
    audio.play();
    playButton.classList.remove("fa-play");
    playButton.classList.add("fa-pause");
  }
}

const setMusic = (i) => {
  progress.value = 0;
  let piece = songs[i];
  currentSong = i;
  audio.src = piece.path;

  songName.textContent = piece.name;
  artistName.textContent = piece.artist;
  cover.src = piece.cover;

  audio.addEventListener("loadedmetadata", () => {
    progress.max = audio.duration;
    duration.textContent = formatTime(audio.duration);
  });
};

setMusic(0);

setInterval(() => {
  progress.value = audio.currentTime;
  currentTime.textContent = formatTime(audio.currentTime);
  if (Math.floor(audio.currentTime) == Math.floor(progress.max)) {
    forwardButton.click();
  }
}, 500);

const playMusic = () => {
  audio.play();
};

progress.addEventListener("change", () => {
  audio.currentTime = progress.value;
});

forwardButton.addEventListener("click", () => {
  if (currentSong >= songs.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  setMusic(currentSong);
  playMusic();
});

backwardButton.addEventListener("click", () => {
  if (currentSong <= 0) {
    currentSong = song.length - 1;
  } else {
    currentSong--;
  }
  setMusic(currentSong);
  playMusic();
});

const formatTime = (seconds) => {
  let minutes = Math.floor(seconds / 60); // Находим количество минут
  let remainingSeconds = Math.floor(seconds % 60); // Оставшиеся секунды
  if (remainingSeconds < 10) {
    remainingSeconds = "0" + remainingSeconds;
  }
  return `${minutes}:${remainingSeconds}`;
};
