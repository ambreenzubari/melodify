console.log("Welcome to Spotify");

// Initialize variables
let progress;
let songIndex = 0;
let masterSogName = document.getElementById("masterSongName");
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songContainer = document.querySelector('.songItemContainer');
let songDuration = {};

let songs = [
    { songName: "Udh Charya", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Shakar Waddan -PagalWord", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Galt Fehmi -PagalWord", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Sinf-e-Ahan OST", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Heroes Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba- Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyan", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tmhari Kasm", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
];

// Function to load and set song durations
const loadSongDurations = () => {
    songs.forEach((song, index) => {
        let audio = new Audio(song.filePath);
        audio.addEventListener('loadedmetadata', () => {
            let duration = audio.duration;
            let minutes = Math.floor(duration / 60);
            let seconds = Math.floor(duration % 60);
            songDuration[index + 1] = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            // Update the UI with the duration once it is known
            const songItem = songContainer.querySelector(`#song-${index + 1}`);
            if (songItem) {
                songItem.querySelector(".duration").innerText = songDuration[index + 1];
            }
        });
    });
};

// Insert song items into the container
const insertSongs = () => {
    songContainer.innerHTML = ''; // Clear existing content
    songs.forEach((song, index) => {
        let songItemHTML = `
            <div class="songItem" id="song-${index + 1}">
                <img src="${song.coverPath}" alt="${index + 1}"/>
                <span class="songName">${song.songName}</span>
                <span class="songListPlay">
                    <span class="timestamp">
                        <span class="duration">00:00</span>
                        <i class="far songItemPlay fa-play-circle" id="${index + 1}"></i>
                    </span>
                </span>
            </div>
        `;
        songContainer.innerHTML += songItemHTML;
    });
    loadSongDurations(); // Call this function to load and set song durations
};

// Initial setup
insertSongs();

// Update the play icon for the currently playing song
const updatePlayIcons = () => {
    console.log("Updating play icons");
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        console.log("JERE+===")
        if (parseInt(element.id) === songIndex) {
            element.classList.remove('fa-play-circle');
            element.classList.add('fa-pause-circle');
        } else {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        }
    });
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // gif.style.opacity = 0;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle song item play/pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    
    element.addEventListener('click', (e) => {
console.log("CLICK----")
        songIndex = parseInt(e.target.id);
        audioElement.src = songs[songIndex - 1].filePath;
        audioElement.play();
        audioElement.currentTime = 0;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity = 1;
        masterSogName.innerText = songs[songIndex - 1].songName;
        updatePlayIcons(); // Update play icons for the new song
    });
});

// Handle forward button
document.getElementById('foward').addEventListener('click', () => {
    if (songIndex >= songs.length) songIndex = 0;
    songIndex += 1;
    audioElement.src = songs[songIndex - 1].filePath;
    audioElement.play();
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSogName.innerText = songs[songIndex - 1].songName;
    updatePlayIcons(); // Update play icons for the new song
});

// Handle previous button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 1) songIndex = songs.length + 1;
    songIndex -= 1;
    audioElement.src = songs[songIndex - 1].filePath;
    audioElement.play();
    audioElement.currentTime = 0;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSogName.innerText = songs[songIndex - 1].songName;
    updatePlayIcons(); // Update play icons for the new song
});

// Automatically play next song when the current song ends
audioElement.addEventListener('ended', () => {
    document.getElementById('foward').click();
});
