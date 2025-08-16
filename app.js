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

// progress
const progresswrap = document.querySelector('.bar-wrap');
const progress = document.querySelector('.progress-bar');

// songs
let songs;
let songIndex = 0;

// fets json
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

// load song
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
    audio.play()
}

// load next song
function nextSong() {
    songIndex += 1;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    audio.play()
}


// Play, prev, next btns
playBtn.addEventListener('click', () => {
    isAudioPlaying() ? pauseAudio() : playAudio();

});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// volume
vol.addEventListener('input', () => {audio.volume = vol.value / 100} )

// progress
function progressbar(prog) {
    const { duration, currentTime } = prog.srcElement;
    const progressPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progressPercentage}%`;
    
    if (progressPercentage == 100 ){
        nextSong()
    }
}
audio.addEventListener('timeupdate', progressbar);

// update progress
function updatebar(e) {
    const {duration} = audio;
    audio.currentTime = ( e.offsetX / this.clientWidth) * duration;
}
progresswrap.addEventListener('click', updatebar);
