// media player
const musicPlayer = document.querySelector('.music-player')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')

// tittle and image
const audioTitle = document.querySelector('.music-title')
const audioImage = document.querySelector('.music-img')

// volume
let vol = document.getElementById('myRange')

// songs
let songs;
let songIndex = 0;

// FUNC
async function getsongformserver() {
    await fetch('audio.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error('rusak gess');
            }
            return response.json();
        })
        .then((data) => {
            songs = data.songs;
            loadSong(songs[songIndex]);
        })
        .catch((error) => {
            console.error('fetchnya rusak')
        });
}
getsongformserver();

// play audio of current song
function playAudio() {
    musicPlayer.classList.add('playing');
    audio.play();
}

// pause audio of current song
function pauseAudio() {
    musicPlayer.classList.remove('playing');
    audio.pause();
}

// check if song is playing
function isAudioPlaying() {
    return musicPlayer.classList.contains('playing');
}

function loadSong(song) {
    audioTitle.innerText = song.title;
    audio.src = `${song.audio}`;
    audioImage.style.backgroundImage = `url('${song.cover}')`;
}

// load prev song
function prevSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
}

function nextSong() {
    songIndex += 1;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
}

// Play, prev, next btns
playBtn.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudio() : playAudio();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// volume

let volval = vol.value / 100

audio.volume = volval;

