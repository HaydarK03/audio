// media player
const musicPlayer = document.querySelector('.music-player')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')

// tittle and image
const audioTitle = document.querySelector('.music-title')
const audioImage = document.querySelector('.music-img')
const audioSinger = document.querySelector('.music-singer')

// volume
let vol = document.getElementById('myRange')

// progress
const progresswrap = document.querySelector('.bar-wrap');
const progress = document.querySelector('.progress-bar');

// progress time
const currtime = document.querySelector('.current-time')
const songduration  = document.querySelector('.total-duration')

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

function iconState() {
    if (isAudioPlaying() === true ){
        playBtn.innerHTML = '<img src="icon/play.svg" alt="">'
    } else {
        playBtn.innerHTML = '<img src="icon/pause.svg" alt="">'
    }
}

// load song
function loadSong(song) {
    audioTitle.innerText = song.title;
    audio.src = `${song.audio}`;
    audioImage.innerHTML = `<img src="${song.cover}" alt="">`;
    audioSinger.innerText = song.authr;
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
    iconState()
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

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const currentminute = Math.floor(currentTime / 60)
    const currentsecond = Math.floor(currentTime - (currentminute * 60))

    let nolduration = seconds < 10 ? `0${seconds}` : seconds;
    
    songduration.innerHTML = `${minutes}:${nolduration}`
        
    let nolcurrent = currentsecond < 10 ? `0${currentsecond}` : currentsecond;
  
    currtime.innerHTML = `${currentminute}:${nolcurrent}`
}
audio.addEventListener('timeupdate', progressbar);

// update progress
function updatebar(prog) {
    const {duration} = audio;
    const widht = this.clientWidth
    const lebar = progress.offsetWidth
    audio.currentTime = ( prog.offsetX / widht) * duration;
    console.log(lebar)
}
progresswrap.addEventListener('click', updatebar);

const slider = document.getElementById("myRange");        
function upslider(){
    const val = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(90deg, rgb(4, 170, 18) ${val}%, #fff ${val}%)`;  
};
        
slider.addEventListener('input', upslider)

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  // geser slider
  document.querySelector('.slider').style.transform = 
    `translateX(-${index * 100}%)`;

  // update dot
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');

  currentIndex = index;
}

// auto slide setiap 5 detik
setInterval(() => {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}, 5000);

// klik dot manual
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showSlide(index);
  });
});
